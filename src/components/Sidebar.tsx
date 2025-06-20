"use client";

import React, { useState } from "react";
import SidebarButton from "./SidebarButton";
import ProfileCard from "./ProfileCard";
import NavItems from "@/app/config";
import { CircleChevronRight, CircleChevronLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const student = {
  name: "Sihas",
  indexNo: "210745B",
};

const Sidebar = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const {logout} = useAuth();

  const navItems = NavItems();

  const toggleSidebar = () => {
    console.log("brec");
    setIsSidebarExpanded((prevState) => !prevState);
  };

  return (
    <aside
      className={`sidebar-container flex flex-col justify-between transition-all duration-200 ease-in-out ${
        isSidebarExpanded ? "w-[272px]" : "w-[130px]"
      } h-screen bg-[#00173d] p-4`}
    >
      <div>
        {isSidebarExpanded ? (
          <CircleChevronLeft
            style={{ marginBottom: "20px" }}
            size={30}
            color="white"
            onClick={toggleSidebar}
          />
        ) : (
          <CircleChevronRight
            style={{ marginBottom: "20px" }}
            size={30}
            color="white"
            onClick={toggleSidebar}
          />
        )}

        <ProfileCard
          name={student.name}
          indexNo={student.indexNo}
          isSidebarExpanded={isSidebarExpanded}
        />

        <ul className="sidebar-buttons-container mt-4">
          {navItems.map((button) => (
            <SidebarButton
              key={button.label}
              label={button.label}
              href={button.href}
              logo={button.logo}
              active={button.active}
              isSidebarExpanded={isSidebarExpanded}
            />
          ))}
        </ul>
      </div>

      {/* 👇 Logout button fixed at bottom */}
      <button
        onClick={() => {
          // Call your logout logic here (e.g. useAuth().logout())
          console.log("Logging out...");
          logout();
        }}
        className="text-white w-full py-2 px-4 rounded hover:bg-red-700 bg-red-600 transition mt-4"
      >
        {isSidebarExpanded ? "Logout" : "⏻"}
      </button>
    </aside>
  );
};

export default Sidebar;
