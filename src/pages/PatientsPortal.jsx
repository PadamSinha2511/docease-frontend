/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/ctbbVnivHwL
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/
import { CardTitle, CardContent, CardHeader, CardDescription, CardFooter, Card } from "@/components/patients-dashboard/card"
import { Button } from "@/components/patients-dashboard/button"
import Navbar from "../components/auth/Navbar"
import DoctorImage1 from "../assets/doctor-1.jpg"
import DoctorImage5 from "../assets/doctor-5.png"
import DoctorImage4 from "../assets/doctor-4.jpg"
import PatientImage1 from"../assets/patient-image-1.jpg"
import { UserState } from "@/context/UserProvider"
import { useEffect, useState } from "react"
import axios from "axios"
import io from "socket.io-client"
import { useNavigate } from "react-router-dom"
import {CONFIG} from "../constants/constant"

const socket = io(`${CONFIG.apiurl}`);

export default function PatientPortal() {
  const {user,loading,setUser} = UserState();
  const[allAppt,setAllAppt]  = useState([])
  const[start,setStart] = useState(false)
  const navigate = useNavigate();
  useEffect(()=>{
    if (!user) return;

    const getAllAppt = async () => {
      try {
        const { data } = await axios.post(`${CONFIG.apiurl}/api/appt/patient`, {
          patientId: user._id,
        });

        setAllAppt(data.allAppointment);
      } catch (error) {
        console.log(error);
      }
    };

    const storedStart = localStorage.getItem('start');
    if (storedStart) {
      setStart(JSON.parse(storedStart));
    }

    getAllAppt();

    console.log("Initial appointments:", allAppt);

    socket.on('appointmentUpdated', (updatedAppt) => {
      setAllAppt((prevAppts) => {
        // Log previous and updated appointments
        console.log("Previous appointments:", prevAppts);
        console.log("Updated appointment:", updatedAppt);

        const updatedAppointments = prevAppts.map((appt) =>
          appt._id === updatedAppt._id ? updatedAppt : appt
        );

        // Log new state
        console.log("New appointments state:", updatedAppointments);
        
        return updatedAppointments;
      });

      setStart(true);
      localStorage.setItem('start', JSON.stringify(true));
    });

    return () => {
      socket.off('appointmentUpdated');
    };
  },[user])

  const handleJoinRoom=(roomid)=>{
    navigate(`/room/${roomid}`)
  }

  return (
    <Card className="border">
      {/* {console.log(allAppt)} */}
        <><Navbar/></>
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
        <CardContent className="border p-4">
          <div className="flex items-center gap-4">
            <img
              alt="Your Avatar"
              className="rounded-full"
              height="48"
              src={user.photo}
              style={{
                aspectRatio: "48/48",
                objectFit: "cover",
              }}
              width="48" />
            <div>
              <div className="font-semibold text-lg">{user.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Email : {user.email}</div>
              {/* <div className="text-sm text-gray-500 dark:text-gray-400">General Hospital</div> */}
            </div>
          </div>
        </CardContent>
      </CardHeader>
      <CardHeader>
        <CardTitle>Appointments</CardTitle>
        <CardDescription>View and manage your appointment requests with doctors.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 overflow-auto">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

              {allAppt.map((row)=>(

            <div key={row._id} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2">
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="40"
                  src={row.doctorId.photo}
                  style={{
                    aspectRatio: "40/40",
                    objectFit: "cover",
                  }}
                  width="40" />
                <div>
                  <div className="font-semibold">{row.doctorId.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{row.doctorId.specialty}</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">Headache</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">10:00 AM</div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-medium text-yellow-500">{row.status}</div>
                <div className="flex gap-2">
                {console.log(start)}
                <Button
                    onClick={() => handleJoinRoom(row._id)}
                    size="sm"
                    variant="outline"
                    disabled={row.status === "completed" || row.status !=="confirmed"}
                  >
                    Join Meeting
                  </Button>
                  <Button size="sm" variant="outline" disabled={row.status === "completed"}>
                    Cancel Request
                  </Button>
                </div>
              </div>
            </div>
              ))}

           
            
          </div>
        </div>
      </CardContent>
      {/* <CardFooter>
        <Button className="ml-auto bg-purple-600" onClick={logout}>Logout</Button>
      </CardFooter> */}
    </Card>
  );
}



function MountainIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>)
  );
}
