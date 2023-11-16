"use client";

import DashboardLine from "../components/Dashboard/DashboardLine";
import { useAuth } from "../firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Courses from "../components/Course/Courses";
import CourseAddModal from "../components/Modals/CourseAddModal";

const Dashboard = () => {
  const { logout, currentUser, getFirebaseUserData, userData } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    } else {
      getFirebaseUserData(currentUser.uid);
    }
  }, []);


  useEffect(() => {
   

      if (userData.role == 'teacher') {
        router.push('/dashboard/teacher')
      }
      else {
    
      }
   
  }, [userData])
  


  return (
    <div className="flex">
      {currentUser && (
        <DashboardLine currentUser={currentUser} logout={logout} />
      )}

      <Courses currentUser={currentUser} />
    </div>
  );
};

export default Dashboard;
