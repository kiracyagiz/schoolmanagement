"use client"

import { useState } from "react";
import { useAuth } from "../../firebase";

const CourseAddModal = ({ isOpen,setIsOpen ,currentUser,setCourse,course}) => {
  const modalClass = isOpen ? 'block' : 'hidden';
  const [courseId,setCourseId] = useState('')
  const { addCourseToUser } = useAuth();

  const handler = () => {
    const newCourse = { [courseId]: courseId };

    setCourse((prevCourses) => [...prevCourses, newCourse]);
    addCourseToUser(currentUser.uid, courseId);
    setIsOpen(!isOpen);
  };
  

  return (
    <div className={`fixed inset-0 bg-gray-500 bg-opacity-75  ${modalClass}`}>
      <div className="flex items-center justify-center mx-auto h-screen w-4/5">
        <div className="bg-white p-8 rounded-md">

        <label for="courseId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course ID</label>
        <input type="text" id="Course ID" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
         block w-full p-2.5" placeholder="0000001" required onChange={(e)=> setCourseId(e.target.value)}/>

            
         <div className="flex justify-between ">
         <button onClick={() => setIsOpen(!isOpen)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
            Close
          </button>
          <button onClick={handler} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
            Add
          </button>
         </div>

          
        </div>
      </div>
    </div>
  );
};

export default CourseAddModal;
