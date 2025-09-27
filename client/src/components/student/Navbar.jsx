import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const { navigate, isEducator, backendUrl, setIsEducator, getToken } =
    useContext(AppContext);

  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate("/educator");
        return;
      }
      const token = await getToken();
      const { data } = await axios.get(
        backendUrl + "/api/educator/update-role",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setIsEducator(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const Logo = () => (
    <div
      className="flex items-center gap-3 cursor-pointer"
      onClick={() => navigate("/")}
    >
      <div className="flex items-center justify-center rounded-full bg-white shadow-lg border-2 border-blue-400 hover:scale-105 transition-transform duration-300 w-12 h-12">
        <img src="/src/assets/e.svg" alt="Logo" className="h-8 w-8 object-contain" />
      </div>
      <span className="text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 uppercase">
        EdTechBd
      </span>
    </div>
  );

  return (
    <nav className={`w-full ${isCourseListPage ? "bg-white shadow-md" : "bg-cyan-100/70 backdrop-blur-md"} sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-6 md:px-14 lg:px-36 flex items-center justify-between py-4">

        {/* Logo */}
        <Logo />

        {/* Desktop Links */ }
        <div className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          <Link className="hover:text-blue-600 transition" to="/">Home</Link>
          <Link className="hover:text-blue-600 transition" to="/courses">All Courses</Link>
          <Link className="hover:text-blue-600 transition" to="/categories">Categories</Link>
          <Link className="hover:text-blue-600 transition" to="/deals">Deals</Link>
          <Link className="hover:text-blue-600 transition" to="/blog">Blog</Link>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          {user && (
            <>
              <button
                onClick={becomeEducator}
                className="px-4 py-2 rounded-md hover:text-blue-600 transition"
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
              <Link
                to="/my-enrollments"
                className="hover:text-blue-600 transition"
              >
                My Enrollments
              </Link>
            </>
          )}
          {user ? (
            <UserButton
              appearance={{
                elements: {
                  userButtonBox: "bg-white rounded-full shadow-md hover:scale-105 transition-transform duration-200",
                },
              }}
            />
          ) : (
            <button
              onClick={() => openSignIn()}
              className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-shadow shadow-md"
            >
              Sign In / Sign Up
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="text-gray-700 focus:outline-none"
          >
            {showMobileMenu ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white shadow-lg w-full px-6 py-4 flex flex-col gap-4">
          <Link to="/">Home</Link>
          <Link to="/courses">All Courses</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/deals">Deals</Link>
          <Link to="/blog">Blog</Link>
          {user && (
            <>
              <button onClick={becomeEducator}>
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
              <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
          {!user && (
            <button onClick={() => openSignIn()} className="bg-blue-600 text-white px-4 py-2 rounded-full">
              Sign In / Sign Up
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
