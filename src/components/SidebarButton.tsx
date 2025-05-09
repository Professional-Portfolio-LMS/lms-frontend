import Link from "next/link";
import React from "react";

export interface SidebarProps {
  logo: React.ReactNode;
  label: string;
  href: string;
  active: boolean;
  isSidebarExpanded: boolean;
}

const SidebarButton: React.FC<SidebarProps> = ({
  logo,
  label,
  href,
  active,
  isSidebarExpanded,
}) => {
  return (
    <li>
      <Link
        className={`sidebar-button flex items-center transition-all duration-200 ease-in-out ${
          isSidebarExpanded
            ? "py-3 px-6 gap-[36px] w-[210px]"
            : "py-3 px-3 justify-center gap-0 w-[100px]"
        }`}
        href={href}
      >
        {logo}
        <span
          className={`overflow-hidden transition-all duration-200 ease-in-out ${
            isSidebarExpanded
              ? "opacity-100 w-auto"
              : "opacity-0 w-0 pointer-events-none "
          } ${active ? "font-bold" : ""}`}
        >
          {label}
        </span>
      </Link>
    </li>

    // <li transition-all duration-200 ease-in-out>
    //   <Link
    //     className={`sidebar-button ${
    //       isSidebarExpanded ? "py-3 px-6" : "py-3 px-3 justify-center"
    //     }`}
    //     href={href}
    //   >
    //     {logo}
    //     {isSidebarExpanded && (
    //       <span className={`${active ? "font-bold" : ""}`}>{label}</span>
    //     )}
    //   </Link>
    // </li>
  );
};

export default SidebarButton;
