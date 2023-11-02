"use client"

import DashboardLine from "../components/Dashboard/DashboardLine";
import { useAuth } from "../firebase";
import { db } from "../firebase";
import { useEffect ,useState} from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

const Dashboard = () => {

    const {logout,currentUser} = useAuth();
    const [userData, setUserData] = useState(null);
    const router = useRouter();

    useEffect(() => {
      if(!currentUser){
        router.push('/')
      }
  
    }, [])
    

    useEffect(() => {
      if (currentUser) {
        const userUID = currentUser.uid;
        const colRef = collection(db, 'users');
        const q = query(colRef, where("uid", "==", userUID));
  
        const fetchData = async () => {
          try {
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
              snapshot.forEach((doc) => {
                setUserData(doc.data());
              });
            } else {
              console.log("Kullanıcı verisi bulunamadı.");
            }
          } catch (err) {
            console.error(err.message);
          }
        };
  
        fetchData();
      }
    }, [userData]);
  
  return (
    <div className="flex"> 
    {currentUser && 
        <DashboardLine currentUser={currentUser} logout={logout}/>
    }

    </div>
  )
}

export default Dashboard