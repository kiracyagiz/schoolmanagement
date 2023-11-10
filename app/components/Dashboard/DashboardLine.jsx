"use client"

import { BiSolidDashboard, BiCar, BiNotification ,BiLogOut} from "react-icons/bi";
import { TbBrandBooking } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const DashboardLine = ({currentUser,logout}) => {

  const [active,setActive] = useState(false)
  const router = useRouter();

  const logOutHandler= () => {
    logout();
    router.push('/')

}
  
  const clickHandler = () => {
    setActive(!active)    
  }

  const data = [
    { name: "Dashboard" ,id:'/dashboard'},
    { name: "Drivers" ,id:'/dashboard'},
    { name: "Bookings" ,id:'/dashboard'},
    { name: "Notifications" ,id:'/dashboard'},
    { name: "Settings",id:'/dashboard' },
  ];



  const icons = [
    BiSolidDashboard,
    BiCar,
    TbBrandBooking,
    BiNotification,
    FiSettings,
  ];

  return (
<div className={` ${active ? 'w-72' : 'w-fit'} border  h-screen bg-gray-600 shadow-xl relative`}>
  <button className="absolute top-2 right-4  text-white text-2xl cursor-pointer  w-8 h-8 rounded-full flex items-center justify-center transition ease-in-out duration-1000"
  onClick={clickHandler}
  >
    {`${active ? 'X' : '->'}`}
  </button>
  <h1 className={`text-white ${active ? 'block' : 'hidden'} text-3xl text-center mt-8 mb-20`}>HR LOGO</h1>
  
  <h1 className="text-4xl text-black"></h1>
  {data.map((dt, i) => {
    const Icon = icons[i];


    return (
     <Link href={dt.id}>
      <div className={`text-white text-2xl cursor-pointer hover:bg-blue-600 ${active ? 'w-80' : 'w-fit'} p-4 px-8 hover:shadow-2xl flex items-center gap-x-8 mb-4 mt-8 ml-4`}
      key={i}
      >
        <Icon  size={35} />
        <p>{`${active ? dt.name : ''}`}</p>
      </div>
     </Link>
    );
  })}

   <div className="flex flex-col gap-y-4">
   <p className="text-white text-center ">
      <p className="text-blue-600">Welcome!!</p>
      {currentUser?.email}
    </p>

    <div className="text-center flex items-center gap-x-4 text-lg cursor-pointer hover:bg-blue-600 bg-slate-400 rounded-md w-fit mx-auto px-4 py-2 text-white"
    onClick={logOutHandler}
    >
      <BiLogOut/>
      <p>Logout</p>
    </div>
   </div>

</div>

  );
};

export default DashboardLine;
