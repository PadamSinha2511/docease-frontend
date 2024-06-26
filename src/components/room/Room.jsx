import React from "react"
import { useNavigate, useParams } from "react-router-dom";
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt"
import { UserState } from "@/context/UserProvider";
import axios from "axios";
import {CONFIG} from "../../constants/constant"

const Room = ()=>{

    const {roomid} = useParams();
    const navigate = useNavigate();
    const {user,loading,setUser} = UserState();
    const myMeeting = async(element)=>{
        const appID=715584205
        const serverSecret = "692759af6fa31e0fc57b8d17957a6a0e"
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID,serverSecret,roomid,user._id,user.name)

        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container:element,
            scenario:{
                mode:ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton:false,
            onLeaveRoom:async()=>{

                const updatedStatusAppt = await axios.post(`${CONFIG.apiurl}/api/appt/updatestatus`,{id:roomid})
                console.log("This is updated status",updatedStatusAppt)
                console.log(user.role)
                if(user.role==='doctor')
                    {
                        navigate("/doctorspage")
                    }
                    else{
                        navigate("/patientspage")
                    }

            }
        })

        
    }
    return(
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-4xl h-[80vh] border border-gray-300 rounded-lg overflow-hidden" ref={myMeeting}/>
        </div>
    )
}

export default Room;