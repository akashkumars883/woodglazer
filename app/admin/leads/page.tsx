"use client";

import { useState, useEffect } from "react";
import { getInquiries, markInquiryAsViewed } from "../actions";
import { 
  Users, 
  Phone, 
  CheckCircle2, 
  Loader2, 
  User, 
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
          className="mt-4 px-6 py-2 bg-stone-900 text-white rounded-xl font-bold"
        >
          Try Again
        </button>
      </div>
    );
  }

  const newLeadsCount = inquiries.filter(i => !i.viewed).length;

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-secondary tracking-tight">
            Lead <span className="text-primary italic font-serif">Management</span>
          </h1>
          <p className="text-stone-500 font-medium">Manage incoming customer inquiries and service requests.</p>
        </div>
        
        {newLeadsCount > 0 && (
          <div className="bg-red-50 text-red-600 px-6 py-3 rounded-2xl border border-red-100 flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="font-bold">{newLeadsCount} New Unread Leads</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {inquiries.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] border border-stone-100 p-20 text-center space-y-4">
            <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto text-stone-300">
               <Users className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-secondary">No inquiries yet</h3>
            <p className="text-stone-500 max-w-sm mx-auto">When customers fill out the contact form on your website, they will appear here.</p>
          </div>
        ) : (
          inquiries.map((lead) => (
            <div 
              key={lead.id} 
              className={`group bg-white rounded-[2rem] border transition-all duration-300 overflow-hidden ${
                !lead.viewed 
                  ? "border-primary/20 shadow-md shadow-primary/5 ring-1 ring-primary/5" 
                  : "border-stone-100 hover:border-stone-300"
              }`}
            >
              <div className="flex flex-col lg:flex-row">
                <div className={`p-6 lg:w-48 flex flex-col justify-between items-center text-center lg:border-r ${
                  !lead.viewed ? "bg-primary/[0.02] border-primary/10" : "bg-stone-50/50 border-stone-100"
                }`}>
                  <div className="space-y-2">
                    {!lead.viewed ? (
                      <span className="inline-block px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full">New</span>
                    ) : (
                      <span className="inline-block px-3 py-1 bg-stone-200 text-stone-500 text-[10px] font-black uppercase tracking-widest rounded-full">Viewed</span>
                    )}
                    <div className="flex items-center justify-center gap-1.5 text-stone-400 text-xs font-bold pt-2">
                      <Clock className="w-3 h-3" />
                      {new Date(lead.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                  
                  {!lead.viewed && (
                    <button
                      onClick={() => handleMarkViewed(lead.id)}
                      disabled={updating === lead.id}
                      className="mt-4 text-xs font-bold text-primary hover:underline flex items-center gap-1.5"
                    >
                      {updating === lead.id ? <Loader2 className="w-3 h-3 animate-spin"/> : <CheckCircle2 className="w-3 h-3" />}
                      Mark as Read
                    </button>
                  )}
                </div>

                <div className="p-8 flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-500 shrink-0">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Customer</p>
                        <p className="text-lg font-bold text-secondary">{lead.name}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-500 shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Phone</p>
                        <p className="text-secondary font-bold">{lead.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                         <CheckCircle2 className="w-5 h-5" />
                       </div>
                       <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Requested Service</p>
                         <p className="text-secondary font-bold">{lead.service || "General Inquiry"}</p>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2 lg:col-span-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Message</p>
                    <p className="text-stone-600 text-sm leading-relaxed italic">
                      &quot;{lead.message || "No message provided."}&quot;
                    </p>
                  </div>
                </div>

                <div className="p-6 lg:p-8 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-stone-100">
                  <a 
                    href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} 
                    target="_blank"
                    className="flex items-center gap-3 bg-green-500 text-white px-6 py-4 rounded-2xl font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-500/20"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Reply
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
