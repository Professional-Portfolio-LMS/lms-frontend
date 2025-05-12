"use client";

import { usePathname } from "next/navigation";
import { Bell, MessageCircle } from "lucide-react";
import BreadcrumbNav from "./BreadcrumbNav";

const getTitleFromPath = (path: string) => {
  if (path === "/") return "Home";
  if (path.startsWith("/courses")) return "Courses";
  if (path.startsWith("/assignments")) return "Assignments";
  if (path.startsWith("/settings")) return "Settings";
  return "Not Found :(";
};

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 w-full flex justify-between align-middle items-center p-[18px] border-b">
      {/* <h1 className="text-xl font-bold">{getTitleFromPath(pathname)}</h1> */}
      <BreadcrumbNav />
      <div className="flex gap-4">
        <Bell />
        <MessageCircle />
      </div>
    </header>
  );
};

export default Header;
