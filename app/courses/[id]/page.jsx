"use client"

import { useState,useEffect } from "react";
import { useAuth } from "../../firebase"
import LoadingModal from "../../components/General/LoadingModal";
import DashboardLine from "../../components/Dashboard/DashboardLine";
import CourseInformation from "../../components/Course/CourseInformation";
import PdfModal from "../../components/Modals/CourseAddModal";


const index = ({params}) => {
  const {id} = params
  const {getCoursesData,personalCourseData} = useAuth();
  const [courseInfo,setCourseInfo]= useState([]);
  useEffect(() => {
    if (id) {
      getCoursesData(id)
      .then((data)=> {
        setCourseInfo(data)
      })
    }

   
  },[])
  

  

  return (
    <div className="flex">
      <DashboardLine/>
      <div className="w-screen">
      <p>ID: {id}</p>
      {courseInfo && courseInfo.length > 0 ?
      <div  >
        {courseInfo.map((dt,i)=> (
          <p key={i}>
            <CourseInformation dt={dt}/>
          </p>
        ))}

      </div>
      : <LoadingModal/> }
      </div>
    </div>
  )
}

export default index