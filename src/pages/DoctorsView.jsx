/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/uacnIoAZV4U
 */
import { Link } from 'react-router-dom'
import { Label } from "@/components/patientportal/label"
import { Input } from "@/components/patientportal/input"
import { Button } from "@/components/patientportal/searchbutton"
import { CardContent, Card } from "@/components/patientportal/card"
import Navbar from '../components/auth/Navbar'
import DoctorImage1 from '../assets/doctor-1.jpg'
import DoctorImage2 from '../assets/doctor-2.jpg'
import DoctorImage3 from '../assets/doctor-3.jpg'
import DoctorImage4 from '../assets/doctor-4.jpg'
import DoctorImage5 from '../assets/doctor-5.png'
import Btn from '../components/patientportal/appointment-button.jsx'
import { useEffect, useState } from 'react'
import { UserState } from '@/context/UserProvider'
import axios from 'axios'
import {CONFIG} from '../constants/constant'

export default function DoctorsView() {

  const {user} = UserState();
  const [allDocs,setAllDocs] = useState([]);
  const [loading,setLoading] = useState(false);
  useEffect(()=>{

    try {
      const handleFetchAllDoc =async()=>{

        setLoading(true)
        const {data} = await axios.get(`${CONFIG.apiurl}/api/doctor/all`);
        setAllDocs(data.allDocs);
        setLoading(false)
        console.log(data.allDocs)
      }


      handleFetchAllDoc();
    } catch (error) {
      
    }


    
    
  },[user])

  // return(
  //   {loading && (
  //     <div>
  //     Loading.......
  //  </div>
  //   )

    
  //   }
  // )

  return (
    (<div className="flex flex-col min-h-[100dvh]">
      <header className="w-full px-4 lg:px-6 h-14 flex items-center">
        <><Navbar/></>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-4 px-4 md:px-6 lg:gap-10">
            <form className="flex items-center gap-4">
              <Label className="text-lg font-semibold mb-9" htmlFor="problem">
                Describe Your Problem:
              </Label>
              <Input
                className="w-full"
                id="problem"
                placeholder="E.g. Headache, Back Pain, etc."
                type="text" />
              <Button className='bg-purple-600'>Find Recommended Doctors</Button>
            </form>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Choose Your Doctor</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {
              allDocs.map((doc)=>(
              <Card>
                <CardContent className="flex flex-col items-center gap-4">
                  <img
                    alt="Doctor"
                    className="rounded-full"
                    height="200"
                    src={doc.photo}
                    style={{
                      aspectRatio: "200/200",
                      objectFit: "cover",
                    }}
                    width="200" />
                  <div className="text-lg font-semibold">{doc.name}</div>
                  <div className="text-sm text-gray-500">{doc.specialty}</div>
                  <div className="text-xs text-green-500">Online & Available</div>
                  <p className="text-sm text-gray-500">
                    Qualifications: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div className="text-sm text-gray-500">Rating: 4.5/5</div>
                  <div className="text-sm text-gray-500">Experience: {doc.experience} years</div>
                  <Btn pid={user._id} did={doc._id}/>
                </CardContent>
              </Card>
              ))
            }


              
              {/* <Card>
                <CardContent className="flex flex-col items-center gap-4">
                  <img
                    alt="Doctor"
                    className="rounded-full"
                    height="200"
                    src={DoctorImage2}
                    style={{
                      aspectRatio: "200/200",
                      objectFit: "cover",
                    }}
                    width="200" />
                  <div className="text-lg font-semibold">Dr. Sonal Maurya</div>
                  <div className="text-sm text-gray-500">Dermatologist</div>
                  <div className="text-xs text-red-500">Offline</div>
                  <p className="text-sm text-gray-500">
                    Qualifications: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <div className="text-sm text-gray-500">Rating: 4.2/5</div>
                  <div className="text-sm text-gray-500">Experience: 8 years</div>
                  <Btn/>
               
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center gap-4">
                  <img
                    alt="Doctor"
                    className="rounded-full"
                    height="200"
                    src={DoctorImage3}
                    style={{
                      aspectRatio: "200/200",
                      objectFit: "cover",
                    }}
                    width="200" />
                  <div className="text-lg font-semibold">Dr. Padam Sinha</div>
                  <div className="text-sm text-gray-500">Pediatrician</div>
                  <div className="text-xs text-green-500">Online & Available</div>
                  <p className="text-sm text-gray-500">
                    Qualifications: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                  </p>
                  <div className="text-sm text-gray-500">Rating: 4.8/5</div>
                  <div className="text-sm text-gray-500">Experience: 12 years</div>
                  <Btn/>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center gap-4">
                  <img
                    alt="Doctor"
                    className="rounded-full"
                    height="200"
                    src={DoctorImage4}
                    style={{
                      aspectRatio: "200/200",
                      objectFit: "cover",
                    }}
                    width="200" />
                  <div className="text-lg font-semibold">Dr. Shipra Chaubey</div>
                  <div className="text-sm text-gray-500">Psychiatrist</div>
                  <div className="text-xs text-green-500">Online & Available</div>
                  <p className="text-sm text-gray-500">
                    Qualifications: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                  </p>
                  <div className="text-sm text-gray-500">Rating: 4.8/5</div>
                  <div className="text-sm text-gray-500">Experience: 12 years</div>
                  <Btn/>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center gap-4">
                  <img
                    alt="Doctor"
                    className="rounded-full"
                    height="200"
                    src={DoctorImage5}
                    style={{
                      aspectRatio: "200/200",
                      objectFit: "cover",
                    }}
                    width="200" />
                  <div className="text-lg font-semibold">Dr. Chulli Chaurasia</div>
                  <div className="text-sm text-gray-500">Neurologist</div>
                  <div className="text-xs text-green-500">Online & Available</div>
                  <p className="text-sm text-gray-500">
                    Qualifications: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                  </p>
                  <div className="text-sm text-gray-500">Rating: 4.8/5</div>
                  <div className="text-sm text-gray-500">Experience: 12 years</div>
                  <Btn/>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center gap-4">
                  <img
                    alt="Doctor"
                    className="rounded-full"
                    height="200"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "200/200",
                      objectFit: "cover",
                    }}
                    width="200" />
                  <div className="text-lg font-semibold">Dr. Alex Johnson</div>
                  <div className="text-sm text-gray-500">Oncologist</div>
                  <div className="text-xs text-green-500">Online & Available</div>
                  <p className="text-sm text-gray-500">
                    Qualifications: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                  </p>
                  <div className="text-sm text-gray-500">Rating: 4.8/5</div>
                  <div className="text-sm text-gray-500">Experience: 12 years</div>
                  <Btn/>
                </CardContent>
              </Card> */}
              
            </div>
          </div>
        </section>
      </main>
      <footer
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Acme Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>)
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
