import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setGlobalState,useGlobalState } from "./Global";
export default function Welcome(){
    const [name,setName]=useState()
    const [email,setEmail]=useState()
    const [profilePic,setProfilePic]=useState()
    const [key,setKey]=useState()
    const Navigate=useNavigate()
    useEffect(()=>{
        if(localStorage){
            
            setName(localStorage.getItem('username'))
            setProfilePic(localStorage.getItem('pic'))
        }
        else{
           
          }
    },[])
 
    // console.log(key,name,email,profileUrl)
    return(
        <div className="bg-blue-500 p-5 flex gap-5">
           <Avatar
                    src={profilePic}
                    alt={name}
                    sx={{ width: 44, height: 44 }}
                    className="mt-2"
                  />
            <h1 className="text-[40px]">Welcome {name} </h1>

        </div>
    )
}