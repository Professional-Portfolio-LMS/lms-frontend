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
        className={`sidebar-button ${
          isSidebarExpanded ? "py-3 px-6" : "py-3 px-3 justify-center"
        }`}
        href={href}
      >
        {logo}
        {isSidebarExpanded && (
          <span className={`${active ? "font-bold" : ""}`}>{label}</span>
        )}
      </Link>
    </li>
  );
};

export default SidebarButton;
