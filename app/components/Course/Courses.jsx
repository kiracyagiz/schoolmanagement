"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../firebase";
import CourseBox from "./CourseBox";
import LoadingModal from "../General/LoadingModal";
import CourseAddModal from "../Modals/CourseAddModal";

const Courses = ({ currentUser }) => {
  const { userData, loading } = useAuth();
  const [course, setCourse] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    
    if (userData) {
      setCourse(userData.courses);
    }
  }, [course, userData]);


  return (
    <div className="w-full p-10 ">
      <div className="flex justify-center mx-auto">
        {loading && <LoadingModal />}
        <div>
          <button className="p-2 bg-blue-400 absolute top-[1px] mb-8 left-[156px]" onClick={() => setIsOpen(!isOpen)}>Add Course</button>
          <CourseAddModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            currentUser={currentUser}
            setCourse={setCourse}
            course={course}
          />
        </div>

        {course && course.length > 0 && (
          <div className="flex  flex-wrap  gap-y-10 gap-x-10  text-center">
            {course.map((dt, i) => (
              <div key={i}>
                <CourseBox className={dt.courseName} uid={dt.courseId} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
