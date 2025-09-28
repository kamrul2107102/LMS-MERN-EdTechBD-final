import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, FilePlus, BookOpen, Users, Menu } from "lucide-react";

const Sidebar = () => {
  const { isEducator } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const menuItems = [
    { name: "Dashboard", path: "/educator", icon: LayoutDashboard },
    { name: "Add Course", path: "/educator/add-course", icon: FilePlus },
    { name: "My Courses", path: "/educator/my-courses", icon: BookOpen },
    { name: "Earnings", path: "/educator/student-enrolled", icon: Users },
  ];

  return (
    isEducator && (
      <div className="flex">
        {/* ✅ Sidebar */}
        <div
          className={`${
            isOpen ? "w-52" : "w-16"
          } border-r min-h-screen text-base border-gray-300 py-2 flex flex-col transition-[width] duration-700 ease-in-out bg-white fixed md:relative z-50 shadow-lg`}
        >
          {/* ✅ Toggle Button + Brand */}
          <div className="relative flex items-center justify-start px-2 mb-4 md:mb-6">
            {/* Menu Toggle */}
            <button
              onClick={toggleSidebar}
              className="flex items-center justify-center p-2 group relative bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors duration-300"
            >
              <Menu
                className={`w-6 h-6 text-gray-700 transform transition-transform duration-700 ease-in-out ${
                  isOpen ? "rotate-90" : "rotate-0"
                }`}
              />
              {/* Tooltip */}
              <span
  className={`absolute top-full left-[60%] -translate-x-0 mt-1 whitespace-nowrap text-gray-400 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
>
  {isOpen ? "Close Sidebar" : "Open Sidebar"}
</span>


            </button>

            {/* Brand Text */}
            <span
              className={`text-lg font-bold text-[rgb(23,23,232)] leading-none ml-3 overflow-hidden transition-all duration-500 whitespace-nowrap ${
                isOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0"
              }`}
            >
              EdTechBd
            </span>
          </div>

          {/* ✅ Menu Items */}
{menuItems.map((item) => (
  <NavLink
    to={item.path}
    key={item.name}
    end={item.path === "/educator"}
    className={({ isActive }) =>
      `flex items-center gap-3 py-3.5 px-3 rounded-r-full transition-all duration-500 ease-in-out ${
        isActive
          ? "bg-indigo-50 border-r-[2px] border-indigo-300"
          : "hover:bg-gray-100 border-r-[6px] border-white hover:border-gray-100/90"
      }`
    }
  >
    {/* Icon stays fixed */}
    <item.icon className="w-6 h-6 text-gray-700 flex-shrink-0" strokeWidth={1.7} />

    {/* Text fades out when collapsed */}
    <p
      className={`overflow-hidden whitespace-nowrap transition-all duration-500 ${
        isOpen ? "opacity-100 ml-3" : "opacity-0 ml-0 w-0"
      }`}
    >
      {item.name}
    </p>
  </NavLink>
))}

        </div>

        {/* ✅ Content Overlay for mobile */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/30 md:hidden z-40 transition-opacity duration-700"
            onClick={toggleSidebar}
          ></div>
        )}
      </div>
    )
  );
};

export default Sidebar;
