"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  Loader2, 
  Globe, 
  MapPin, 
  Hash, 
  Phone, 
  MessageSquare,
  Plus,
  X,
  CheckCircle2,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { getSiteSettings, updateSiteSetting, initializeSiteSettings } from "../actions";
import { siteConfig } from "@/lib/site";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [settings, setSettings] = useState({
    name: siteConfig.name,
    description: siteConfig.description,
    keywords: [...siteConfig.keywords],
    serviceArea: [...siteConfig.serviceArea],
    phone: "+91 9999999999",
    whatsapp: "+91 9999999999"
  });

  const [newKeyword, setNewKeyword] = useState("");
  const [newCity, setNewCity] = useState("");

  const handleSync = useCallback(async () => {
    setSaving("sync");
    await initializeSiteSettings();
    const result = await getSiteSettings();
    if (result.success && result.settings) {
      setSettings(prev => ({ ...prev, ...result.settings }));
    }
    setSaving(null);
    setSuccess("sync");
    setTimeout(() => setSuccess(null), 3000);
  }, []);

  const fetchSettings = useCallback(async () => {
    const result = await getSiteSettings();
    if (result.success && result.settings && Object.keys(result.settings).length > 0) {
      setSettings(prev => ({
        ...prev,
        ...result.settings
      }));
    } else if (result.success) {
      handleSync();
    }
    setLoading(false);
  }, [handleSync]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleSave = async (key: string, value: string | string[]) => {
    setSaving(key);
    const result = await updateSiteSetting(key, value);
    if (result.success) {
      setSuccess(key);
      setTimeout(() => setSuccess(null), 3000);
    } else {
      console.error(`Failed to save ${key}:`, result.error);
      alert(`Save Failed: ${result.error || "Unknown error"}. Please check your database connection.`);
      // Revert if it was a list update to keep UI in sync with DB
      if (key === 'keywords' || key === 'serviceArea') fetchSettings();
    }
    setSaving(null);
  };


  const addItem = (type: 'keywords' | 'serviceArea', value: string) => {
    if (!value.trim()) return;
    const newList = [...settings[type], value.trim()];
    setSettings({ ...settings, [type]: newList });
    if (type === 'keywords') setNewKeyword("");
    else setNewCity("");
    handleSave(type, newList);
  };

  const removeItem = (type: 'keywords' | 'serviceArea', index: number) => {
    const newList = settings[type].filter((_, i) => i !== index);
    setSettings({ ...settings, [type]: newList });
    handleSave(type, newList);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-stone-400 font-bold tracking-widest uppercase text-xs">Loading Settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-secondary tracking-tight">Admin <span className="text-primary italic font-serif">Settings</span></h1>
          <p className="text-stone-500 font-medium text-lg leading-relaxed">Manage your website&apos;s global identity, SEO, and contact details.</p>
        </div>
        
        <button 
          onClick={handleSync}
          disabled={saving === 'sync'}
          className="flex items-center gap-3 bg-stone-100 px-6 py-4 rounded-2xl hover:bg-stone-200 transition-all group font-bold text-stone-600"
        >
          {saving === 'sync' ? (
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
          ) : success === 'sync' ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          )}
          <span>Sync Default Settings to DB</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Basic Info */}
        <section className="bg-white rounded-[2.5rem] border border-stone-200 p-8 sm:p-10 shadow-sm space-y-8">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-stone-100 rounded-2xl text-stone-600"><Globe className="w-6 h-6" /></div>
              <h2 className="text-2xl font-bold text-secondary">Site Identity</h2>
           </div>

           <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-stone-400 ml-1">Site Name</label>
                <div className="relative">
                  <input 
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/10 transition-all font-bold text-secondary"
                    value={settings.name}
                    onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                    onBlur={() => handleSave('name', settings.name)}
                  />
                  {saving === 'name' && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-primary" />}
                  {success === 'name' && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-stone-400 ml-1">Site Description</label>
                <div className="relative">
                  <textarea 
                    rows={4}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium text-stone-600 resize-none"
                    value={settings.description}
                    onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                    onBlur={() => handleSave('description', settings.description)}
                  />
                  {saving === 'description' && <Loader2 className="absolute right-4 top-4 w-4 h-4 animate-spin text-primary" />}
                </div>
              </div>
           </div>
        </section>

        {/* Contact Info */}
        <section className="bg-white rounded-[2.5rem] border border-stone-200 p-8 sm:p-10 shadow-sm space-y-8">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-stone-100 rounded-2xl text-stone-600"><Phone className="w-6 h-6" /></div>
              <h2 className="text-2xl font-bold text-secondary">Contact Details</h2>
           </div>

           <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-stone-400 ml-1">Phone Number</label>
                <div className="relative">
                  <input 
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/10 transition-all font-bold text-secondary"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    onBlur={() => handleSave('phone', settings.phone)}
                  />
                  <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-stone-400 ml-1">WhatsApp Number</label>
                <div className="relative">
                  <input 
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/10 transition-all font-bold text-secondary"
                    value={settings.whatsapp}
                    onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                    onBlur={() => handleSave('whatsapp', settings.whatsapp)}
                  />
                  <MessageSquare className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300" />
                </div>
              </div>
           </div>
        </section>

        {/* SEO Keywords */}
        <section className="bg-white rounded-[2.5rem] border border-stone-200 p-8 sm:p-10 shadow-sm space-y-8 lg:col-span-2">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary"><Hash className="w-6 h-6" /></div>
                <h2 className="text-2xl font-bold text-secondary">SEO Keywords</h2>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-stone-400 bg-stone-100 px-3 py-1 rounded-full">{settings.keywords.length} keywords active</span>
           </div>

           <div className="flex flex-wrap gap-3">
              {settings.keywords.map((word, idx) => (
                <div key={idx} className="group flex items-center gap-2 bg-stone-50 border border-stone-100 px-4 py-2 rounded-xl transition-all hover:border-primary/20 hover:bg-white">
                  <span className="text-sm font-bold text-stone-600">{word}</span>
                  <button onClick={() => removeItem('keywords', idx)} className="text-stone-300 hover:text-red-500 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <div className="flex items-center gap-2 bg-white border border-dashed border-stone-200 p-1 pl-4 rounded-xl focus-within:border-primary transition-all">
                <input 
                  placeholder="Add new keyword..."
                  className="bg-transparent text-sm font-bold outline-none border-none min-w-[150px]"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addItem('keywords', newKeyword)}
                />
                <button 
                  onClick={() => addItem('keywords', newKeyword)}
                  className="p-1.5 bg-primary text-white rounded-lg hover:scale-105 transition-transform"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
           </div>
        </section>

        {/* Service Cities */}
        <section className="bg-white rounded-[2.5rem] border border-stone-200 p-8 sm:p-10 shadow-sm space-y-8 lg:col-span-2">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary/10 rounded-2xl text-secondary"><MapPin className="w-6 h-6" /></div>
                <h2 className="text-2xl font-bold text-secondary">Service Cities (Local SEO)</h2>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-stone-400 bg-stone-100 px-3 py-1 rounded-full">{settings.serviceArea.length} regions covered</span>
           </div>

           <div className="flex flex-wrap gap-4">
              {settings.serviceArea.map((city, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-lg shadow-stone-900/10 group">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-black uppercase tracking-widest">{city}</span>
                  <button onClick={() => removeItem('serviceArea', idx)} className="ml-2 p-1 hover:bg-white/10 rounded-full transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <div className="flex items-center gap-2 bg-white border-2 border-dashed border-stone-100 p-1 pl-6 rounded-2xl focus-within:border-primary transition-all">
                <input 
                  placeholder="New region..."
                  className="bg-transparent text-sm font-black uppercase tracking-[0.2em] outline-none border-none"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addItem('serviceArea', newCity)}
                />
                <button 
                  onClick={() => addItem('serviceArea', newCity)}
                  className="p-2 bg-primary text-white rounded-xl hover:bg-stone-900 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
           </div>
           
           <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl flex gap-4">
              <AlertCircle className="w-5 h-5 text-orange-500 shrink-0" />
              <p className="text-orange-700 text-sm font-medium italic">
                Tip: Adding more cities here will automatically update your sitemap and JSON-LD schema, 
                improving your visibility in those specific regions.
              </p>
           </div>
        </section>

      </div>
    </div>
  );
}
