"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  FileText,
  Briefcase,
  LogOut,
  Home,
  Users
} from "lucide-react";

import { useState } from "react";
import { logoutAdmin } from "./actions";
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";


const adminNavigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Leads", href: "/admin/leads", icon: Users },
  { name: "Services", href: "/admin/services", icon: Briefcase },
  { name: "Blog Posts", href: "/admin/blog", icon: FileText },
  { name: "SEO Settings", href: "/admin/settings", icon: Settings },
];


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      setLoggingOut(true);
      const result = await logoutAdmin();
      if (result.success) {
        router.push("/admin/login");
        router.refresh();
      }
      setLoggingOut(false);
    }
  };


  // If we are on the login page (if it exists later), or needing to hide sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (

    <div className="h-screen bg-stone-50 flex overflow-hidden">

      <Toaster position="top-right" richColors closeButton />

      {/* Smart Hover Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 bg-stone-900 text-stone-400 
          transition-all duration-500 ease-in-out group shadow-2xl
          w-24 hover:w-72
        `}
      >
        <div className="h-full flex flex-col p-6 overflow-hidden">
          {/* Logo Section */}
          <div className="flex items-center gap-4 mb-12 px-2 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-primary flex-shrink-0 flex items-center justify-center text-white font-black shadow-lg shadow-primary/20">
              A
            </div>
            <span className="text-xl font-bold text-white tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap">
              Admin Panel
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {adminNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-4 px-3.5 py-3 rounded-lg transition-all duration-300
                    ${isActive
                      ? "bg-primary text-white font-semibold"
                      : "hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  <item.icon className={`w-5 h-5 flex-shrink-0 transition-transform ${isActive ? "scale-110" : ""}`} />
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium tracking-wide">
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-white/5 mt-auto space-y-3">
            <Link
              href="/"
              className="flex items-center gap-4 px-3 py-4 rounded-2xl hover:bg-white/5 hover:text-white transition-all duration-300 group/link"
            >
              <Home className="w-6 h-6 flex-shrink-0 group-hover/link:text-primary transition-colors" />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium">
                Live Site
              </span>
            </Link>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="w-full flex items-center gap-4 px-3 py-4 rounded-2xl hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 disabled:opacity-50"
            >
              <LogOut className={`w-6 h-6 flex-shrink-0 ${loggingOut ? 'animate-spin' : ''}`} />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium">
                {loggingOut ? "Logging out..." : "Logout"}
              </span>
            </button>

          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col ml-24 transition-all duration-500 h-screen relative">

        {/* Dynamic Page Header */}
        <header className="h-20 lg:h-24 bg-white border-b border-stone-100 sticky top-0 z-30 flex items-center px-8 lg:px-12 justify-between backdrop-blur-md bg-white/80">
          <div className="flex items-center gap-4">
            <div className="w-2 rounded-full h-8 bg-primary/20" />
            <h2 className="text-xl font-black text-secondary tracking-tight">
              {adminNavigation.find(n => n.href === pathname)?.name || "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col text-right">
              <p className="text-sm font-black text-secondary leading-none">Admin User</p>
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">Super Admin</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-secondary font-black border border-stone-200 shadow-sm transition-transform hover:scale-105 cursor-pointer">
              A
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 lg:p-12">
          {children}
        </div>

      </main>
    </div>
  );
}
