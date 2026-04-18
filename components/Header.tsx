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
    <header
      className={[
        "sticky top-0 z-50 border-b transition-all duration-300",
        isScrolled
          ? "border-border/80 bg-background/92 shadow-[0_18px_48px_-28px_rgba(52,21,18,0.38)] backdrop-blur-xl"
          : "border-transparent bg-background/78 backdrop-blur-md",
      ].join(" ")}
    >
      <div className="mx-auto flex h-20 max-w-8xl items-center gap-3 px-4 sm:px-6 lg:px-8">
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
              width={164}
              height={60}
              className="h-full w-auto object-contain sm:h-28"
              preload
              unoptimized
            />
          </Link>
        </div>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-2 lg:flex"
        >
          {navigationItems.slice(0, 2).map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                isLinkActive(item.href)
                  ? "bg-primary/5 text-primary"
                  : "text-foreground/80 hover:text-secondary"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <div className="group relative">
            <button
              type="button"
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                pathname.startsWith("/services")
                  ? "bg-primary/5 text-primary"
                  : "text-foreground/80 hover:text-secondary"
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

          {navigationItems.slice(2).map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                isLinkActive(item.href)
                  ? "bg-primary/5 text-primary"
                  : "text-foreground/80 hover:text-secondary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
          <Link
            href="/contact"
            className="hidden items-center rounded-full tracking-wide bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_16px_35px_-20px_rgba(197,133,36,0.9)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary sm:inline-flex"
          >
            <PhoneCall className="mr-2 h-4 w-4" />
            +91 971704859
          </Link>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-surface/95 text-foreground shadow-sm transition-colors duration-200 hover:bg-accent/60 lg:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="relative block h-4 w-5">
              <span
                className={[
                  "absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-all duration-200",
                  isMenuOpen ? "top-[7px] rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition-all duration-200",
                  isMenuOpen ? "opacity-0" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current transition-all duration-200",
                  isMenuOpen ? "top-[7px] -rotate-45" : "",
                ].join(" ")}
              />
            </span>
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div
          id="mobile-navigation"
          className="border-t border-border/70 bg-surface/96 px-4 pb-5 pt-4 shadow-[0_28px_48px_-34px_rgba(52,21,18,0.38)] backdrop-blur-xl lg:hidden"
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            {navigationItems.slice(0, 2).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-2xl px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  isLinkActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-accent/55"
                }`}
                onClick={closeMenus}
              >
                {item.label}
              </Link>
            ))}

            <div className="rounded-[1.75rem] border border-border/80 bg-background/78 p-2">
              <button
                type="button"
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors duration-200 ${
                  pathname.startsWith("/services") ? "text-primary" : "text-foreground"
                }`}
                aria-expanded={isServicesOpen}
                onClick={() => setIsServicesOpen((open) => !open)}
              >
                <span>Services</span>
                <svg
                  viewBox="0 0 12 12"
                  aria-hidden="true"
                  className={[
                    "h-3 w-3 transition-transform duration-200",
                    isServicesOpen ? "rotate-180" : "",
                  ].join(" ")}
                >
                  <path
                    d="M2.25 4.5 6 8.25 9.75 4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.4"
                  />
                </svg>
              </button>

              {isServicesOpen ? (
                <div className="mt-1 flex flex-col gap-1 px-2 pb-2">
                  {serviceItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`rounded-2xl px-4 py-3 text-sm transition-colors duration-200 ${
                        pathname === item.href
                          ? "bg-primary/10 text-primary font-bold"
                          : "text-foreground/88 hover:bg-accent/55"
                      }`}
                      onClick={closeMenus}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            {navigationItems.slice(2).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-2xl px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  isLinkActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-accent/55"
                }`}
                onClick={closeMenus}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/contact"
              className="mt-3 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_16px_35px_-20px_rgba(197,133,36,0.9)] transition-all duration-200 hover:bg-secondary"
              onClick={closeMenus}
            >
              <PhoneCall className="mr-2 h-4 w-4" />
              Request Quote
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
