"use client";

import { PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

// This is now fetched dynamically inside the Header component
// const serviceItems = [
//   { href: "/services/wood-polishing-services", label: "Wood Polishing Service" },
//   { href: "/services/carpentry-services", label: "Carpentry Services" },
// ];
import { supabase } from "@/lib/supabase";


export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [serviceItems, setServiceItems] = useState<{ href: string; label: string }[]>([]);

  useEffect(() => {
    async function fetchNavServices() {
      const { data } = await supabase
        .from("service_categories")
        .select("slug, title")
        .order("created_at", { ascending: true });
      
      if (data) {
        setServiceItems(data.map(cat => ({
          href: `/services/${cat.slug}`,
          label: cat.title
        })));
      }
    }
    fetchNavServices();
  }, []);


  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  const syncScrolledState = useEffectEvent(() => {
    setIsScrolled(window.scrollY > 12);
  });

  useEffect(() => {
    syncScrolledState();

    const handleScroll = () => {
      syncScrolledState();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={[
          "sticky top-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl shadow-[0_8px_32px_-12px_rgba(52,21,18,0.1)] border-b border-border/40 py-4"
            : "bg-transparent border-b border-transparent py-4",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-8xl items-center gap-3 px-6 lg:px-12">
          <div className="flex min-w-0 flex-1 items-center">
            <Link
              href="/"
              className="inline-flex items-center rounded-full transition-transform duration-300 hover:scale-[1.01]"
              aria-label="Wood Glazer home"
              onClick={closeMenus}
            >
              <Image
                src="/brand/wood-glazer-logo.png"
                alt="Wood Glazer"
                width={140}
                height={50}
                className="h-8 w-auto object-contain sm:h-10 md:h-11 lg:h-12 transition-all duration-300"
                priority
                unoptimized
              />
            </Link>
          </div>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-2 lg:flex"
          >
            {navigationItems.slice(0, 2).map((item) => {
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-350 after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px] after:origin-left after:bg-primary after:transition-transform after:duration-300 ${
                    active
                      ? "text-primary after:scale-x-100"
                      : "text-foreground/80 hover:text-primary after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="group relative">
              <button
                type="button"
                className={`relative inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors duration-350 after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px] after:origin-left after:bg-primary after:transition-transform after:duration-300 ${
                  pathname.startsWith("/services")
                    ? "text-primary after:scale-x-100"
                    : "text-foreground/80 hover:text-primary after:scale-x-0 hover:after:scale-x-100"
                }`}
                aria-haspopup="true"
              >
                Services
              </button>

              <div className="pointer-events-none absolute left-1/2 top-full w-72 -translate-x-1/2 translate-y-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="rounded-md border border-border/80 bg-white p-3 shadow-[0_24px_70px_-34px_rgba(52,21,18,0.35)]">
                  {serviceItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                        pathname === item.href
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/80 hover:bg-accent/40 hover:text-secondary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navigationItems.slice(2).map((item) => {
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-350 after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px] after:origin-left after:bg-primary after:transition-transform after:duration-300 ${
                    active
                      ? "text-primary after:scale-x-100"
                      : "text-foreground/80 hover:text-primary after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
            <Link
              href="/contact"
              className="hidden items-center rounded-full tracking-wider bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_16px_35px_-20px_rgba(197,133,36,0.9)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary sm:inline-flex"
            >
              <PhoneCall className="mr-2 h-4 w-4" />
              +91 9717048359
            </Link>

            <button
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="relative z-50 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/5 text-secondary transition-all duration-300 hover:bg-secondary/10 lg:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <div className="flex w-6 flex-col items-end justify-center gap-1.5">
                <span
                  className={[
                    "h-0.5 rounded-full bg-current transition-all duration-300",
                    isMenuOpen ? "w-6 translate-y-2 rotate-45" : "w-6",
                  ].join(" ")}
                />
                <span
                  className={[
                    "h-0.5 rounded-full bg-current transition-all duration-300",
                    isMenuOpen ? "w-0 opacity-0" : "w-4",
                  ].join(" ")}
                />
                <span
                  className={[
                    "h-0.5 rounded-full bg-current transition-all duration-300",
                    isMenuOpen ? "w-6 -translate-y-2 -rotate-45" : "w-5",
                  ].join(" ")}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Premium Mobile Menu Overlay - Moved outside header to fix scroll issues */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 z-[100] bg-white lg:hidden overflow-y-auto"
        >
          {/* Header duplicate inside menu for the 'X' button */}
          <div className="flex items-center justify-between px-6 h-20 border-b border-stone-100">
            <Image
              src="/brand/wood-glazer-logo.png"
              alt="Wood Glazer"
              width={140}
              height={50}
              className="h-10 w-auto object-contain"
              unoptimized
            />
            <button
              onClick={closeMenus}
              className="h-12 w-12 flex items-center justify-center rounded-2xl bg-stone-50 text-secondary"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col px-6 py-12">
            <nav className="flex flex-col gap-6">
              {navigationItems.slice(0, 2).map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-4xl font-display font-medium transition-all duration-300 ${
                    isLinkActive(item.href)
                      ? "text-primary"
                      : "text-secondary hover:text-primary"
                  }`}
                  onClick={closeMenus}
                >
                  {item.label}
                </Link>
              ))}

              {/* Services Section */}
              <div className="py-2">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className={`flex w-full items-center justify-between text-4xl font-display font-medium transition-all duration-300 ${
                    pathname.startsWith("/services") ? "text-primary" : "text-secondary"
                  }`}
                >
                  <span>Services</span>
                  <svg 
                    className={`w-8 h-8 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isServicesOpen && (
                  <div className="mt-6 flex flex-col gap-5 pl-4 border-l-2 border-primary/20">
                    {serviceItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={`text-xl font-display transition-all duration-300 ${
                          pathname === item.href
                            ? "text-primary font-bold"
                            : "text-secondary/60 hover:text-primary"
                        }`}
                        onClick={closeMenus}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navigationItems.slice(2).map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-4xl font-display font-medium transition-all duration-300 ${
                    isLinkActive(item.href)
                      ? "text-primary"
                      : "text-secondary hover:text-primary"
                  }`}
                  onClick={closeMenus}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-16 space-y-10">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-primary px-8 py-5 text-lg font-bold text-white shadow-xl transition-all hover:bg-secondary"
                onClick={closeMenus}
              >
                <PhoneCall className="mr-3 h-6 w-6" />
                Get a Free Quote
              </Link>

              <div className="flex justify-between items-center text-stone-300 text-[10px] font-black uppercase tracking-[0.2em]">
                <span>Wood Glazer Premium</span>
                <span>Est. 2024</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
