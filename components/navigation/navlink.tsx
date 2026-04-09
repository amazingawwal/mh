"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function NavLink({ href, children, className = "", onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        relative px-1 py-0.5 transition-colors duration-200
        ${isActive
          ? "text-emerald-700 font-semibold"
          : "text-slate-700 hover:text-emerald-600"
        }
        after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-emerald-500
        after:transition-all after:duration-200
        ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}
        ${className}
      `}
    >
      {children}
    </Link>
  );
}