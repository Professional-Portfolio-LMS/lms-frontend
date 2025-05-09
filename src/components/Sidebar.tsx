"use client";

import React, { useState } from "react";
import SidebarButton from "./SidebarButton";
import ProfileCard from "./ProfileCard";
import Image from "next/image";
import NavItems from "@/app/config";
import { CircleChevronRight, CircleChevronLeft } from "lucide-react";

const student = {
  name: "Sihas",
  indexNo: "210745B",
};

const Sidebar = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const navItems = NavItems();

  const toggleSidebar = () => {
    console.log("brec");
    setIsSidebarExpanded((prevState) => !prevState);
  };

  return (
    <aside
      className={`sidebar-container transition-all duration-200 ease-in-out ${
        isSidebarExpanded ? "w-[260px]" : "w-[130px]"
      }`}
    >
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
      <ul className="sidebar-buttons-container">
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
    </aside>
  );
};

export default Sidebar;
