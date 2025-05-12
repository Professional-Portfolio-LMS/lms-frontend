"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const BreadcrumbNav = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = segments.map((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    const isLast = i === segments.length - 1;

    return (
      <span key={href} className="flex items-center gap-1">
        {!isLast ? (
          <Link href={href} className="text-[#00173d] hover:underline">
            {isNaN(Number(seg)) ? capitalize(seg) : seg}
          </Link>
        ) : (
          <span className="text-gray-500">
            {isNaN(Number(seg)) ? capitalize(seg) : seg}
          </span>
        )}
        {!isLast && <ChevronRight className="w-4 h-4 text-gray-400" />}
      </span>
    );
  });

  return (
    <nav className="text-gray-600 flex flex-wrap items-center">
      <Link href="/" className="text-[#00173d] hover:underline">
        Home
      </Link>
      {segments.length > 0 && (
        <ChevronRight className="w-4 h-4 text-gray-400" />
      )}
      {breadcrumbs}
    </nav>
  );
};

export default BreadcrumbNav;
