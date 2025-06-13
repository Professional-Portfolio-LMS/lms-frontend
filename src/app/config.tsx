"use client";
import { usePathname } from "next/navigation";
import React from "react";
import {
  House,
  LibraryBig,
  NotebookText,
  Settings,
  Trophy,
} from "lucide-react";

const NavItems = () => {
  const pathname = usePathname() ?? "";

  function isNavItemActive(pathname: string, nav: string) {
    return pathname.startsWith(nav);
  }
  return [
    { logo: <House />, label: "Home", href: "/", active: pathname === "/" },
    {
      logo: <LibraryBig />,
      label: "Courses",
      href: "/courses",
      active: isNavItemActive(pathname, "/courses"),
    },
    {
      logo: <NotebookText />,
      label: "Assignments",
      href: "/assignments",
      active: isNavItemActive(pathname, "/assignments"),
    },
    {
      logo: <Trophy />,
      label: "Grades",
      href: "/grades",
      active: isNavItemActive(pathname, "/grades"),
    },
    {
      logo: <Settings />,
      label: "Settings",
      href: "/settings",
      active: isNavItemActive(pathname, "/settings"),
    },
  ];
};

export default NavItems;
