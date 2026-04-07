"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  // Don't show breadcrumbs on the home page
  if (pathname === "/") return null;

  const pathSegments = pathname.split("/").filter((segment) => segment !== "");
  
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    
    return { label, href };
  });

  return (
    <nav aria-label="Breadcrumb" className="bg-stone-50/50 py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-y-2 text-sm font-medium text-stone-500">
          <li className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center hover:text-primary transition-colors py-1"
              aria-label="Home"
            >
              <Home className="h-4 w-4" />
            </Link>
          </li>
          
          {breadcrumbs.map((breadcrumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            return (
              <li key={breadcrumb.href} className="flex items-center">
                <ChevronRight className="h-4 w-4 text-stone-300 mx-2 shrink-0" />
                {isLast ? (
                  <span className="text-secondary font-semibold truncate max-w-[140px] sm:max-w-xs py-1">
                    {breadcrumb.label}
                  </span>
                ) : (
                  <Link 
                    href={breadcrumb.href}
                    className="hover:text-primary transition-colors whitespace-nowrap py-1"
                  >
                    {breadcrumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
