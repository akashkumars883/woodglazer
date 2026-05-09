"use client";

import { useState, useRef } from "react";
import { Upload, Link as LinkIcon, Loader2, Sparkles, Check, AlertCircle, Trash, ImageIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({ value, onChange, label = "Cover Image" }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [optimizationLog, setOptimizationLog] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Client-side HTML5 Canvas Image Resizer and Compressor (WebP, max width 1600px for high-fidelity banners)
  const compressImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Limit maximum dimension to 1600px for gorgeous high-res widescreen screens
          const MAX_SIZE = 1600;
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Canvas context is unavailable"));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          // Export as highly-optimized WebP with 85% quality
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error("Image compression failed"));
              }
            },
            "image/webp",
            0.85
          );
        };
        img.onerror = () => reject(new Error("Failed to load image for compression"));
      };
      reader.onerror = () => reject(new Error("Failed to read selected file"));
    });
  };

  const uploadToSupabase = async (blob: Blob, originalSize: number): Promise<string> => {
    const fileExt = "webp";
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

    const { data, error: uploadError } = await supabase.storage
      .from("images")
      .upload(fileName, blob, {
        cacheControl: "31536000",
        contentType: "image/webp",
        upsert: true,
      });

    if (uploadError) {
      if (uploadError.message.includes("not found") || uploadError.message.includes("does not exist")) {
        try {
          const { error: createError } = await supabase.storage.createBucket("images", {
            public: true,
          });

          if (!createError) {
            const { data: retryData, error: retryError } = await supabase.storage
              .from("images")
              .upload(fileName, blob, {
                cacheControl: "31536000",
                contentType: "image/webp",
                upsert: true,
              });

            if (retryError) throw retryError;
            if (retryData) {
              const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(fileName);
              return publicUrl;
            }
          } else {
            throw createError;
          }
        } catch (bucketErr) {
          console.warn("Storage upload failed. Falling back to Base64 storage.", bucketErr);
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        }
      }
      throw uploadError;
    }

    if (data) {
      const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(fileName);
      return publicUrl;
    }

    throw new Error("Failed to retrieve public upload link");
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setOptimizationLog(null);

    const initialSizeKb = Math.round(file.size / 1024);

    try {
      const compressedBlob = await compressImage(file);
      const optimizedSizeKb = Math.round(compressedBlob.size / 1024);
      const ratioSaved = Math.round(((file.size - compressedBlob.size) / file.size) * 100);

      const finalUrl = await uploadToSupabase(compressedBlob, file.size);
      
      onChange(finalUrl);
      setOptimizationLog(`⚡ WebP High-Fidelity Banner Generated! Reduced from ${initialSizeKb}KB to ${optimizedSizeKb}KB (-${ratioSaved}%)`);
    } catch (err: unknown) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Failed to compress or upload image file.");
    } finally {
      setUploading(false);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    onChange("");
    setOptimizationLog(null);
    setError(null);
  };

  const fallbackImage = "https://images.unsplash.com/photo-1538688549894-f44af883acbb?q=80&w=2000";

  return (
    <div className="space-y-4">
      {/* Label and Clear Bar */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-black uppercase tracking-[0.2em] text-stone-400 ml-1">
          {label}
        </label>
        {value && (
          <button
            type="button"
            onClick={clearImage}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-700 hover:underline transition-all"
          >
            <Trash className="w-3.5 h-3.5" />
            Clear Image
          </button>
        )}
      </div>

      {/* Large Full-Width Banner Image Preview Area */}
      <div className="w-full">
        {value ? (
          <div className="group relative w-full aspect-[21/9] md:aspect-[2.4/1] rounded-[2rem] overflow-hidden border border-stone-200 shadow-lg bg-stone-50 flex items-center justify-center">
            {/* Real high-res cover banner preview */}
            <img
              src={value}
              alt="Cover preview"
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = fallbackImage;
              }}
            />
            
            {/* Interactive Dark Gradient Hover Overlay */}
            <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 backdrop-blur-[2px]">
              <button
                type="button"
                onClick={triggerFileSelect}
                className="bg-white/95 text-stone-800 hover:bg-white hover:scale-105 px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-md"
              >
                <Upload className="w-4 h-4 text-primary" />
                Change Widescreen Cover
              </button>
            </div>

            {/* Quick Status Pill */}
            <div className="absolute bottom-4 left-4 bg-black/60 text-white backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live Preview Active
            </div>
          </div>
        ) : (
          /* Large, premium Dashed Upload Zone */
          <div 
            onClick={triggerFileSelect}
            className="group w-full aspect-[21/9] md:aspect-[2.4/1] rounded-[2rem] border-2 border-dashed border-stone-200 hover:border-primary bg-stone-50/50 hover:bg-stone-50 flex flex-col items-center justify-center p-8 text-center gap-3 transition-all cursor-pointer shadow-inner"
          >
            {uploading ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-xs font-bold text-stone-500 uppercase tracking-widest animate-pulse">Compressing & Generating WebP CDN...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 bg-white rounded-2xl border border-stone-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-secondary tracking-tight uppercase">Upload Cover Banner</h4>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mt-1">Drag and drop or click to choose from computer</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Inputs and helper actions underneath */}
      <div className="space-y-3 pt-2">
        {/* Paste link input */}
        <div className="relative flex items-center bg-stone-50 border border-stone-200 rounded-2xl p-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 transition-all">
          <LinkIcon className="w-5 h-5 text-stone-400 ml-3" />
          <input
            type="url"
            placeholder="Or paste custom image URL instead..."
            className="w-full bg-transparent border-none focus:ring-0 px-3 py-2.5 text-sm font-semibold text-stone-700 outline-none placeholder:text-stone-300"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setOptimizationLog(null);
            }}
          />
        </div>

        {/* Secret File input element */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {/* Messages and success optimization notifications */}
        {error && (
          <div className="bg-red-50 border border-red-100 p-3 rounded-xl flex items-center gap-2 text-red-600 text-xs font-bold leading-normal">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {optimizationLog && (
          <div className="bg-primary/5 border border-primary/10 p-3.5 rounded-xl flex items-center gap-2 text-primary text-xs font-bold leading-normal">
            <Sparkles className="w-4 h-4 text-primary flex-shrink-0 animate-pulse" />
            <span>{optimizationLog}</span>
          </div>
        )}
      </div>
    </div>
  );
}
