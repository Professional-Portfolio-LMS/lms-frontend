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
    <div className="profile-card-container">
      <Image
        src="https://famous-mathematicians.org/wp-content/uploads/2013/07/Pythagoras-250x300.jpg"
        alt="Profile pic"
        width={50}
        height={50}
        className="rounded-full object-cover"
      />
      {isSidebarExpanded && (
        <div className="name-and-index-container">
          <div className="text-xl">Hi, {name}</div>
          <div className="text-sm">{indexNo}</div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
