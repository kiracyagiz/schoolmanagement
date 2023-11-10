"use client"

import { useState,useEffect } from "react";
import { useAuth } from "../../firebase"
import LoadingModal from "../../components/General/LoadingModal";
import DashboardLine from "../../components/Dashboard/DashboardLine";
import CourseInformation from "../../components/Course/CourseInformation";


const index = ({params}) => {
  const {id} = params
  const {getCoursesData} = useAuth();
  const [courseInfo,setCourseInfo]= useState([])
  useEffect(() => {
    getCoursesData(id)
    .then((data)=> {
      setCourseInfo(data)
    })
  
   
  },[courseInfo])
  

  return (
    <div className="flex">
      <DashboardLine/>
      <div className="w-screen">
      <p>ID: {id}</p>
      {courseInfo.length > 0 ?
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