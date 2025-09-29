// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../../context/AppContext";
// import { assets, dummyDashboardData } from "../../assets/assets";
// import Loading from "../../components/student/Loading";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Dashboard = () => {
//   const { currency, backendUrl, getToken, isEducator } = useContext(AppContext);
//   const [dashboardData, setDashboardData] = useState(null);

//   const fetchDashboardData = async () => 
//     {
// // serverless
// //       setDashboardData(dummyDashboardData); // Mock data
// //       useEffect(() => {
// //         fetchDashboardData();
// //       }, []);

//     try {
//       const token = await getToken();
//       const { data } = await axios.get(backendUrl + "/api/educator/dashboard", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (data.success) {
//         setDashboardData(data.dashboardData);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     if (isEducator) {
//       fetchDashboardData();
//     }
//   }, [isEducator]);

//   return dashboardData ? (
//     <div className="min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:ob-0 p-4 pt-8 pb-0">
//       <div className="space-y-5">
//         <div className="flex flex-wrap gap-5 items-center">
//           <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md">
//             <img src={assets.patients_icon} alt="patients_icon" />
//             <div>
//               <p className="text-2xl font-medium text-gray-600">
//                 {dashboardData.enrolledStudentsData.length}
//               </p>
//               <p className="text-base text-gray-500">Total Enrolments</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md">
//             <img src={assets.appointments_icon} alt="appointments_icon" />
//             <div>
//               <p className="text-2xl font-medium text-gray-600">
//                 {dashboardData.totalCourses}
//               </p>
//               <p className="text-base text-gray-500">Total Courses</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md">
//             <img src={assets.earning_icon} alt="earning_icon" />
//             <div>
//               <p className="text-2xl font-medium text-gray-600">
//                 {currency}
//                 {dashboardData.totalEarnings}
//               </p>
//               <p className="text-base text-gray-500">Total Earnings</p>
//             </div>
//           </div>
//         </div>

//         <div>
//           <h2 className="pb-4 text-lg font-medium">Latest Enrolments</h2>
//           <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
//             <table className="table-fixed md:table-auto w-full overflow-hidden">
//               <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
//                 <tr>
//                   <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">
//                     #
//                   </th>
//                   <th className="px-4 py-3 font-semibold">Student Name</th>
//                   <th className="px-4 py-3 font-semibold">Course Title</th>
//                 </tr>
//               </thead>
//               <tbody className="text-sm text-gray-500">
//                 {dashboardData.enrolledStudentsData.map((item, index) => (
//                   <tr key={index} className="border-b border-gray-500/20">
//                     <td className="px-4 py-3 text-center hidden sm:table-cell">
//                       {index + 1}
//                     </td>
//                     <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
//                       <img
//                         src={item.student.imageUrl}
//                         alt="Profile"
//                         className="w-9 h-9 rounded-full"
//                       />
//                       <span className="truncate">{item.student.name}</span>
//                     </td>
//                     <td className="px-4 py-3 truncate">{item.courseTitle}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <Loading />
//   );
// };

// export default Dashboard;


import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ Import React Icons
import { FaUserGraduate, FaMoneyBillWave, FaBookOpen } from "react-icons/fa";

const Dashboard = () => {
   const { currency, backendUrl, getToken, isEducator } = useContext(AppContext);
 const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
//     setDashboardData(dummyDashboardData); // Mock data
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);


try {
  const token = await getToken();
  const { data } = await axios.get(backendUrl + "/api/educator/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (data.success) {
    setDashboardData(data.dashboardData);
  } else {
    toast.error(data.message);
  }
} catch (error) {
  toast.error(error.message);
}
};

useEffect(() => {
if (isEducator) {
  fetchDashboardData();
}
}, [isEducator]);
  return dashboardData ? (
    <div className="min-h-screen p-6 md:p-8 flex flex-col gap-8 bg-gray-50">
      {/* ✅ Summary Cards */}
      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-4 p-4 w-56 bg-white shadow-md border border-gray-200 rounded-lg transition-transform hover:scale-105">
          <FaUserGraduate className="w-10 h-10 text-blue-500" />
          <div>
            <p className="text-2xl font-semibold text-gray-700">
              {dashboardData.enrolledStudentsData.length}
            </p>
            <p className="text-sm text-gray-500">Total Enrolments</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 w-56 bg-white shadow-md border border-gray-200 rounded-lg transition-transform hover:scale-105">
          <FaMoneyBillWave className="w-10 h-10 text-green-500" />
          <div>
            <p className="text-2xl font-semibold text-gray-700">
              {currency}
              {dashboardData.totalEarnings}
            </p>
            <p className="text-sm text-gray-500">Total Earnings</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 w-56 bg-white shadow-md border border-gray-200 rounded-lg transition-transform hover:scale-105">
          <FaBookOpen className="w-10 h-10 text-purple-500" />
          <div>
            <p className="text-2xl font-semibold text-gray-700">
              {dashboardData.totalCourses}
            </p>
            <p className="text-sm text-gray-500">Total Courses</p>
          </div>
        </div>
      </div>

      {/* ✅ Latest Enrolments Table */}
      <div className="w-full max-w-4xl">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Latest Enrolments</h2>
        <div className="overflow-hidden rounded-lg shadow-sm bg-white border border-gray-200">
          <table className="w-full table-auto text-gray-600">
            <thead className="bg-gray-100 text-gray-700 text-sm font-medium">
              <tr>
                <th className="px-4 py-3 text-center hidden sm:table-cell">#</th>
                <th className="px-4 py-3 text-left">Student Name</th>
                <th className="px-4 py-3 text-left">Course Title</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.enrolledStudentsData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-center hidden sm:table-cell">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={item.student.imageUrl}
                      alt={item.student.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <span className="truncate">{item.student.name}</span>
                  </td>
                  <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;

