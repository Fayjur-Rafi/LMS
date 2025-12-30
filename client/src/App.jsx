import React from "react";
import { Routes, Route, useMatch, Outlet } from "react-router-dom";
import Home from "./pages/student/Home";
import CoursesList from "./pages/student/CoursesList";
import CourseDetails from "./pages/student/CourseDetails";
import MyEnrollments from "./pages/student/MyEnrollments";
import Player from "./pages/student/Player";
import Loading from "./components/student/Loading";
import Educator from "./pages/educator/Educator";
import AddCourses from "./pages/educator/AddCourses";
import Dashboard from "./pages/educator/Dashboard";
import MyCourses from "./pages/educator/MyCourses";
import StudentsEnrolled from "./pages/educator/StudentsEnrolled";
import Navbar from "./components/student/Navbar";
import CourseDocs from "./pages/CourseDocs";
import CourseQuiz from "./pages/CourseQuiz";
import "quill/dist/quill.snow.css";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const AppLayout = () => {
  const isEducatorRoute = useMatch("/educator/*");
  return (
    <>
      {!isEducatorRoute && <Navbar />}
      <Outlet />
    </>
  );
};

const App = () => {
  const [data, setData] = useState(null);
  const getData = async () => {
    const res = await axios.get(`http://localhost:4000/`);
    console.log(res.data);
    setData(res.data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="text-default min-h-screen bg-white">
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/course-list" element={<CoursesList />} />
          <Route path="/course-list/:keyword" element={<CoursesList />} />{" "}
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/my-enrollments" element={<MyEnrollments />} />
          <Route path="/player/:courseId" element={<Player />} />
          <Route path="/loading/:path" element={<Loading />} />
          <Route path="/course/:id/docs" element={<CourseDocs />} />
          <Route path="/course/:id/quiz" element={<CourseQuiz />} />
        </Route>
        <Route path="/educator" element={<Educator />}>
          <Route index element={<Dashboard />} />
          <Route path="add-courses" element={<AddCourses />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="students-enrolled" element={<StudentsEnrolled />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
