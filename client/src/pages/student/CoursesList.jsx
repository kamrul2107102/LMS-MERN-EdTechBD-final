// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../../context/AppContext";
// import SearchBar from "../../components/student/SearchBar";
// import { useParams } from "react-router-dom";
// import CourseCard from "../../components/student/CourseCard";
// import { assets } from "../../assets/assets";
// import Footer from "../../components/student/Footer";

// const CoursesList = () => {
//   const { navigate, allCourses } = useContext(AppContext);
//   const { input } = useParams();
//   const [filteredCourses, setFilteredCourses] = useState([]);

//   useEffect(() => {
//     if (allCourses && allCourses.length > 0) {
//       const tempCourses = allCourses.slice();

//       input
//         ? setFilteredCourses(
//             tempCourses.filter((item) =>
//               item.courseTitle.toLowerCase().includes(input.toLowerCase())
//             )
//           )
//         : setFilteredCourses(tempCourses);
//     }
//   }, [allCourses, input]);

//   return (
//     <>
//       <div className="relative md:px-36 px-8 pt-20 text-left">
//         <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
//           <div>
//             <h1 className="text-4xl font-semibold text-gray-800">
//               Course List
//             </h1>
            
//           </div>
//           <SearchBar data={input} />
//         </div>

//         {input && (
//           <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 text-gray-600">
//             <p>{input}</p>
//             <img
//               src={assets.cross_icon}
//               alt="cross_icon"
//               className="cursor-pointer"
//               onClick={() => navigate("/course-list")}
//             />
//           </div>
//         )}

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 my-16 gap-3 px-2 md:p-0">
//           {filteredCourses.map((course, index) => (
//             <CourseCard key={index} course={course} />
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default CoursesList;
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import SearchBar from "../../components/student/SearchBar";
import { useParams } from "react-router-dom";
import CourseCard from "../../components/student/CourseCard";
import { assets } from "../../assets/assets";
import Footer from "../../components/student/Footer";

// Icons
import { Code, Briefcase, Globe, BarChart, Cpu, BookOpen } from "lucide-react";

const CoursesList = () => {
  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams();
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("default");

  // ✅ Static Categories
  const categories = [
    { id: 1, name: "Development", icon: <Code size={20} />, courses: "12,450" },
    { id: 2, name: "Business", icon: <Briefcase size={20} />, courses: "8,320" },
    { id: 3, name: "Design", icon: <Globe size={20} />, courses: "5,210" },
    { id: 4, name: "Data Science", icon: <BarChart size={20} />, courses: "6,780" },
    { id: 5, name: "IT & Software", icon: <Cpu size={20} />, courses: "9,140" },
    { id: 6, name: "Personal Development", icon: <BookOpen size={20} />, courses: "3,870" },
  ];

  // ✅ Function to calculate average rating
  const calculateAverageRating = (course) => {
    if (!course.courseRatings || course.courseRatings.length === 0) return 0;
    const totalRating = course.courseRatings.reduce((sum, rating) => {
      const ratingValue = typeof rating === "object" ? rating.rating : rating;
      return sum + ratingValue;
    }, 0);
    return totalRating / course.courseRatings.length;
  };

  useEffect(() => {
    if (!allCourses || allCourses.length === 0) return;

    let tempCourses = [...allCourses];

    tempCourses = tempCourses.map((c, i) => ({
      ...c,
      category: c.category || categories[i % categories.length].name,
      averageRating: calculateAverageRating(c),
      totalRatings: c.courseRatings ? c.courseRatings.length : 0,
    }));

    if (input) {
      const searchText = input.toLowerCase();
      tempCourses = tempCourses.filter((item) =>
        item.courseTitle.toLowerCase().includes(searchText)
      );
    }

    if (selectedCategories.length > 0) {
      tempCourses = tempCourses.filter((item) =>
        selectedCategories.includes(item.category)
      );
    }

    switch (sortOption) {
      case "lowToHigh":
        tempCourses.sort((a, b) => a.coursePrice - b.coursePrice);
        break;
      case "highToLow":
        tempCourses.sort((a, b) => b.coursePrice - a.coursePrice);
        break;
      case "mostRated":
        tempCourses.sort((a, b) => {
          if (b.averageRating !== a.averageRating) return b.averageRating - a.averageRating;
          return b.totalRatings - a.totalRatings;
        });
        break;
      default:
        break;
    }

    setFilteredCourses(tempCourses);
  }, [allCourses, input, selectedCategories, sortOption]);

  const handleCategoryChange = (categoryName) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <>
      {/* ✅ Sticky Search Bar below Navbar */}
      <div className="w-full bg-gray-50 py-4 px-8 md:px-36 shadow-sm  top-[60px] z-40">
        <SearchBar tall data={input} />
      </div>

      <div className="relative md:px-36 px-8 pt-8 text-left">
        {/* Title + Sorting */}
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full mt-4">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">
              Course List
            </h1>
          </div>

          {/* ✅ Sorting Dropdown */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border px-3 py-2 rounded-lg text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="default">Sort by: Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="mostRated">Highest Rated</option>
          </select>
        </div>

        {/* Search Input visible when searching */}
        {input && (
          <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 text-gray-600 rounded-lg bg-gray-50 shadow-sm">
            <p className="font-medium">{input}</p>
            <img
              src={assets.cross_icon}
              alt="clear_search"
              className="cursor-pointer hover:scale-110 transition-transform"
              onClick={() => navigate("/course-list")}
            />
          </div>
        )}

        {/* ✅ Category Filter */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className={`flex items-center gap-3 p-4 border rounded-lg shadow-sm cursor-pointer transition-all ${
                selectedCategories.includes(cat.name)
                  ? "bg-blue-50 border-blue-600"
                  : "bg-white hover:border-gray-400"
              }`}
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.name)}
                onChange={() => handleCategoryChange(cat.name)}
                className="w-4 h-4 accent-blue-600"
              />
              <div className="flex items-center gap-2">
                {cat.icon}
                <div>
                  <p className="font-semibold text-gray-800">{cat.name}</p>
                  <span className="text-sm text-gray-500">{cat.courses} courses</span>
                </div>
              </div>
            </label>
          ))}
        </div>

        {/* ✅ Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 my-16 gap-6 px-2 md:p-0">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg">
              No courses found matching your filters.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CoursesList;
