"use client";

import { useState, useEffect } from "react";
import { getInquiries, markInquiryAsViewed } from "../actions";
import { 
  Users, 
  Phone, 
  CheckCircle2, 
  Loader2, 
  Package, 
  Clock,
  MessageSquare,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  service?: string;
  message?: string;
  viewed: boolean;
  created_at: string;
}

export default function LeadsDashboard() {
  const [loading, setLoading] = useState(true);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [updating, setUpdating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const result = await getInquiries();
        if (isMounted) {
          if (result.success) {
            setInquiries(result.inquiries || []);
          } else {
            setError(result.error || "Failed to fetch inquiries");
          }
          setLoading(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "An unexpected error occurred");
          setLoading(false);
        }
      }
    })();
    return () => { isMounted = false; };
  }, []);

  const handleMarkViewed = async (id: string) => {
    setUpdating(id);
    try {
      const result = await markInquiryAsViewed(id);
      if (result.success) {
        toast.success("Lead marked as viewed");
        setInquiries(prev => 
          prev.map(item => item.id === id ? { ...item, viewed: true } : item)
        );
      } else {
        toast.error(result.error || "Failed to mark lead as viewed");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to mark lead as viewed");
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-stone-400 font-bold tracking-widest uppercase text-xs">Loading Leads...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-red-500">
        <AlertCircle className="w-10 h-10" />
        <p className="font-bold">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2.5 bg-secondary text-white rounded-xl font-semibold"
        >
          Try Again
        </button>
      </div>
    );
  }

  const newLeadsCount = inquiries.filter(i => !i.viewed).length;

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-semibold text-secondary">Lead Management</h1>
           <p className="text-stone-500 font-medium">Manage incoming customer inquiries and service requests.</p>
        </div>
        
        {newLeadsCount > 0 && (
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded-xl border border-red-100 flex items-center gap-2.5 text-sm font-semibold self-start sm:self-center">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span>{newLeadsCount} New Unread Leads</span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {inquiries.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-16 text-center space-y-4">
            <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto text-stone-300">
               <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-secondary">No inquiries yet</h3>
            <p className="text-stone-500 max-w-sm mx-auto text-sm">When customers fill out the contact form on your website, they will appear here.</p>
          </div>
        ) : (
          inquiries.map((lead) => (
            <div 
              key={lead.id} 
              className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden p-6 ${
                !lead.viewed 
                  ? "border-primary/30 shadow-md shadow-primary/5 ring-1 ring-primary/5 hover:bg-stone-50/30" 
                  : "border-stone-200 hover:border-stone-300 hover:bg-stone-50/30"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                 <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                       <h3 className="font-semibold text-secondary text-lg leading-tight">{lead.name}</h3>
                       <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${!lead.viewed ? "bg-red-50 text-red-600 border border-red-100 animate-pulse" : "bg-stone-50 text-stone-400 border border-stone-100"}`}>
                          {!lead.viewed ? "NEW" : "Viewed"}
                       </span>
                       <span className="text-xs text-stone-400 font-medium flex items-center gap-1 shrink-0">
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(lead.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                       </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-stone-600">
                       <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-stone-400" />
                          <span>{lead.phone}</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-stone-400" />
                          <span className="font-medium text-primary">{lead.service || "General Inquiry"}</span>
                       </div>
                    </div>

                    {lead.message && (
                       <p className="text-stone-500 text-sm leading-relaxed border-l-2 border-stone-100 pl-4 italic">
                          &quot;{lead.message}&quot;
                       </p>
                    )}
                 </div>

                 <div className="flex flex-wrap items-center gap-3 shrink-0 self-start md:self-center">
                    {!lead.viewed && (
                       <button
                          onClick={() => handleMarkViewed(lead.id)}
                          disabled={updating === lead.id}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors disabled:opacity-50"
                       >
                          {updating === lead.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                          Mark as Read
                       </button>
                    )}
                    <a 
                       href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} 
                       target="_blank"
                       className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#20ba5a] transition-all shadow-md shadow-green-500/10"
                    >
                       <MessageSquare className="w-4 h-4" />
                       Reply WhatsApp
                    </a>
                 </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
