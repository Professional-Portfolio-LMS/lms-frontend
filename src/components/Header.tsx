// import React from "react";

// const Header = ({ title }) => {
//   return <header className="sticky top-0 w-full">Header</header>;
// };

// export default Header;

"use client";

import { usePathname } from "next/navigation";
import { Bell, MessageCircle } from "lucide-react";

const getTitleFromPath = (path: string) => {
  if (path === "/") return "Home";
  if (path.includes("/courses")) return "My Courses";
  if (path.includes("/assignments")) return "Assignments";
  if (path.includes("/settings")) return "Settings";
  return "Not Found :(";
};

const Header = () => {
  const pathname = usePathname();
  const title = getTitleFromPath(pathname);

  return (
    <header className="sticky top-0 w-full flex justify-between items-center p-4 border-b">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex gap-4">
        <Bell />
        <MessageCircle />
      </div>
    </header>
  );
};

export default Header;
