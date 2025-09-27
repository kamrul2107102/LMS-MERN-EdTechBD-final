import React from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import Home from "./pages/student/Home";

import CoursesList from "./pages/student/CoursesList";
import CourseDetails from "./pages/student/CourseDetails";
import MyEnrollments from "./pages/student/MyEnrollments";
import Player from "./pages/student/Player";
import Loading from "./components/student/Loading";
import Educator from "./pages/educator/Educator";
import Dashboard from "./pages/educator/Dashboard";
import AddCourse from "./pages/educator/AddCourse";
import MyCourses from "./pages/educator/MyCourses";
import StudentsEnrolled from "./pages/educator/StudentsEnrolled";
import Navbar from "./components/student/Navbar";
import "quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";

// Newly added pages
import Categories from "./pages/student/Categories";
import Deals from "./pages/student/Deals";
import Blog from "./pages/student/Blog";

const App = () => {
  const isEducatorRoute = useMatch("/educator/*");

  return (
    <div className="text-default min-h-screen bg-white">
      <ToastContainer />
      {!isEducatorRoute && <Navbar />}

      <Routes>
        {/* Public/Student Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/course-list" element={<CoursesList />} />
        <Route path="/course-list/:input" element={<CoursesList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />

        {/* New Navbar Links */}
        <Route path="/categories" element={<Categories />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/blog" element={<Blog />} />

        {/* Educator Routes */}
        <Route path="/educator" element={<Educator />}>
          <Route path="/educator" element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="student-enrolled" element={<StudentsEnrolled />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
