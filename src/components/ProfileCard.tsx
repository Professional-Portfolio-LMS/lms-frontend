import React from "react";
import Image from "next/image";

interface ProfileCardProps {
  name: string;
  indexNo: string;
  isSidebarExpanded: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  indexNo,
  isSidebarExpanded,
}) => {
  return (
    <div className="profile-card-container flex items-center gap-3 transition-all duration-200 ease-in-out">
      <Image
        src="https://famous-mathematicians.org/wp-content/uploads/2013/07/Pythagoras-250x300.jpg"
        alt="Profile pic"
        width={50}
        height={50}
        className="rounded-full object-cover"
      />
      <div
        className={`transition-all duration-200 ease-in-out overflow-hidden ${
          isSidebarExpanded
            ? "opacity-100 w-auto"
            : "opacity-0 w-0 pointer-events-none"
        }`}
      >
        <div className="text-xl">Hi, {name}</div>
        <div className="text-sm">{indexNo}</div>
      </div>
    </div>
  );
};

export default ProfileCard;
