"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { House, BookText, NotebookText, Settings, Menu } from "lucide-react";

const NavItems = () => {
  const pathname = usePathname();

  function isNavItemActive(pathname: string, nav: string) {
    return pathname.includes(nav);
  }
  return [
    { logo: <House />, label: "Home", href: "/", active: pathname === "/" },
    { 
      logo: <BookText />,
      label: "My Courses",
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
      logo: <Settings />,
      label: "Settings",
      href: "/settings",
      active: isNavItemActive(pathname, "/settings"),
    },
  ];
};

export default NavItems;
