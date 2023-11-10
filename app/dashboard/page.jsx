"use client"

import DashboardLine from "../components/Dashboard/DashboardLine";
import { useAuth } from "../firebase";
import { useEffect ,useState} from "react";
import { useRouter } from "next/navigation";
import Courses from "../components/Course/Courses";

const Dashboard = () => {

    const {logout,currentUser,getFirebaseUserData} = useAuth();
    const [userData, setUserData] = useState([]);
    const [courseData,setCourseData] = useState([])
    const router = useRouter();

    useEffect(() => {
      if(!currentUser){
        router.push('/')
      }
      else{
        const userUID = currentUser.uid
        getFirebaseUserData(userUID,setUserData)
      }
  
    }, [])


    useEffect(()=> {
      if(userData)
      {
        setCourseData(userData.courses)
    
      }
    },[userData])

   


  
  return (
    <div className="flex"> 
    {currentUser && 
        <DashboardLine currentUser={currentUser} logout={logout}/>
    }
      <div  className="flex flex-col gap-y-4 ">

    

   </div>
  <Courses courseData={courseData}/>


    </div>
  )
}

export default Dashboard