"use client";

import { useState } from "react";
import { Check, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

interface BlogShareButtonsProps {
  url: string;
  title: string;
}

export default function BlogShareButtons({ url, title }: BlogShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard! 🎉", {
        description: "You can now paste and share it anywhere.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Could not copy text: ", err);
      toast.error("Failed to copy link. Please try again.");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="text-stone-500 font-bold text-sm tracking-wide">Share this article:</span>
      <div className="flex items-center gap-3">
        {/* WhatsApp Share */}
        <a
          href={`https://api.whatsapp.com/send?text=${encodedTitle}%20-%20${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          title="Share on WhatsApp"
          className="w-11 h-11 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:scale-110 active:scale-95 hover:shadow-lg hover:shadow-[#25D366]/20 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.022-.015-.043-.028-.063-.04a25.438 25.438 0 00-1.107-.63c-.156-.081-.3-.153-.427-.215l-.261-.122c-.144-.067-.323-.117-.468-.117s-.273.045-.395.127l-.147.098c-.148.099-.33.22-.507.339-.144.095-.275.183-.377.248-.098.063-.195.109-.286.109-.153 0-.361-.097-.61-.264a6.76 6.76 0 01-1.373-.976 7.421 7.421 0 01-1.127-1.25c-.143-.196-.21-.352-.21-.497 0-.14.053-.257.14-.378.1-.137.228-.315.352-.48.082-.108.156-.208.208-.287a1.11 1.11 0 00.126-.432 1.13 1.13 0 00-.044-.393 14.47 14.47 0 00-.376-.948l-.208-.507c-.12-.295-.245-.6-.352-.897a1.08 1.08 0 00-.317-.46 1.05 1.05 0 00-.47-.11h-.1c-.131 0-.323.05-.486.17-.183.136-.364.298-.53.473-.356.377-.66.865-.66 1.48 0 .151.018.33.05.534.096.611.353 1.348.814 2.193a11.511 11.511 0 004.148 4.6c1.171.745 2.194 1.128 3.018 1.128.18 0 .346-.018.497-.05a5.556 5.556 0 002.327-1.328 1.15 1.15 0 00.147-.847c-.035-.152-.162-.353-.378-.497z" />
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.93.548 3.731 1.493 5.258l-1.42 5.163 5.283-1.385A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zM3.8 12c0-4.522 3.678-8.2 8.2-8.2s8.2 3.678 8.2 8.2-3.678 8.2-8.2 8.2a8.136 8.136 0 01-4.22-1.168l-.303-.18-3.138.822.836-3.04-.197-.314A8.14 8.14 0 013.8 12z" clipRule="evenodd" />
          </svg>
        </a>

        {/* Facebook Share */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          title="Share on Facebook"
          className="w-11 h-11 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:scale-110 active:scale-95 hover:shadow-lg hover:shadow-[#1877F2]/20 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
        </a>

        {/* Twitter/X Share */}
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noreferrer"
          title="Share on X"
          className="w-11 h-11 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-black hover:text-white hover:border-black hover:scale-110 active:scale-95 hover:shadow-lg hover:shadow-black/10 transition-all duration-300"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        {/* Copy Link Button */}
        <button
          type="button"
          onClick={handleCopyLink}
          title="Copy Link"
          className={`w-11 h-11 rounded-full border flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 ${
            copied
              ? "bg-green-50 border-green-300 text-green-600 hover:shadow-lg hover:shadow-green-500/10"
              : "bg-stone-50 border-stone-200 text-stone-600 hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:shadow-primary/10"
          }`}
        >
          {copied ? <Check className="w-5 h-5 animate-in zoom-in-50 duration-200" /> : <LinkIcon className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
