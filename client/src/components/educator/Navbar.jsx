import React from "react";
import { assets, dummyEducatorData } from "../../assets/assets";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const educatorData = dummyEducatorData;
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between px-4 md:px-8 py-3 border-b-[3px] border-b-gradient-to-r from-blue-400 to-blue-600
 bg-white">
      {/* ✅ Logo */}
      <Link to="/">
        <div className="flex items-center justify-center rounded-full shadow-md hover:scale-105 transition-transform duration-300 w-10 h-10">
          <img
            src="/src/assets/logof3.svg"
            alt="Logo"
            className="h-6 w-6 object-contain invert"
          />
        </div>
      </Link>

      {/* ✅ User Section */}
      <div className="flex items-center gap-4 md:gap-6 text-gray-700 relative">
        {/* Greeting */}
        <p className="hidden md:block text-sm font-medium">
          Hi, {user ? user.fullName : "Developers"}
        </p>

        {/* Profile / UserButton */}
        {user ? (
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-10 h-10 rounded-full",
              },
            }}
          />
        ) : (
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 shadow-sm">
            <img
              src={assets.profile_img}
              alt="profile_img"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
