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

import Image from "next/image";
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

      {/* Smart Hover Sidebar - Premium Light Theme */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 bg-white border-r border-border text-stone-500 
          transition-all duration-500 ease-in-out group shadow-sm
          w-24 hover:w-72
        `}
      >
        <div className="h-full flex flex-col p-6 overflow-hidden">
          {/* Logo Section */}
          <div className="relative h-12 w-full flex items-center mb-12 px-1 overflow-hidden select-none">
            {/* Closed State: Custom Woodwork/Paint Brand Icon */}
            <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-10 h-10 transition-all duration-500 group-hover:opacity-0 group-hover:scale-75 opacity-100 scale-100 flex items-center justify-center overflow-hidden">
              <Image
                src="/brand/admin-logo-icon.jpg"
                alt="Logo Icon"
                width={100}
                height={100}
                className="w-full h-full object-cover rounded-lg"
                unoptimized
              />
            </div>

            {/* Expanded State: Full Brand Logo in Original Colors */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-500 opacity-0 scale-95 translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 group-hover:scale-100">
              <Image
                src="/brand/wood-glazer-logo.png"
                alt="Wood Glazer"
                width={130}
                height={36}
                className="h-8 w-auto object-contain"
                unoptimized
              />
            </div>
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
                    flex items-center gap-4 px-3.5 py-3 rounded-xl transition-all duration-300
                    ${isActive
                      ? "bg-secondary text-white font-semibold shadow-md shadow-secondary/10"
                      : "hover:bg-surface hover:text-secondary text-stone-600"
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
          <div className="pt-6 border-t border-border mt-auto space-y-3">
            <Link
              href="/"
              className="flex items-center gap-4 px-3 py-4 rounded-2xl hover:bg-surface hover:text-secondary text-stone-600 transition-all duration-300 group/link"
            >
              <Home className="w-6 h-6 flex-shrink-0 group-hover/link:text-primary transition-colors" />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium">
                Live Site
              </span>
            </Link>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="w-full flex items-center gap-4 px-3 py-4 rounded-2xl hover:bg-red-500/5 hover:text-red-600 text-stone-600 transition-all duration-300 disabled:opacity-50"
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
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-secondary tracking-tight">
              {adminNavigation.find(n => n.href === pathname)?.name || "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col text-right">
              <p className="text-sm font-semibold text-secondary leading-none">Admin User</p>
              <p className="text-[12px] text-stone-400 font-semibold">Super Admin</p>
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
