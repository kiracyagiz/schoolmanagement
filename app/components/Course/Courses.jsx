"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../firebase";
import CourseBox from "./CourseBox";
import LoadingModal from "../General/LoadingModal";

const Courses = ({ courseData }) => {
  const { getCoursesData } = useAuth();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState([]);
  useEffect(() => {
    if (courseData && courseData.length > 0) {
      setLoading(true);
      const fetchCourseData = async () => {
        const promises = courseData.map((dt) => getCoursesData(dt));
        const resolvedData = await Promise.all(promises);

        const flattenedData = [].concat(...resolvedData);

        setCourse(flattenedData);
        setLoading(false);
      };

      fetchCourseData();
    }
  }, [courseData]);

  return (
    <div className="w-full p-10 ">
      {loading && <LoadingModal />}
      <div className="flex justify-center mx-auto">
        
      {course.length > 0 && (
        <div className="flex  flex-wrap  gap-y-10 gap-x-10  text-center">
          {course.map((dtt, i) => (
            <CourseBox  className={dtt.className} uid={dtt.uid} key={i} />
          ))}
        </div>
      )}
      </div>
    </div>
  );
};
export default Courses;
