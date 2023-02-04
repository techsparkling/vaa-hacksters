import React from "react";
import Lottie from "lottie-react";
import { useState,useEffect } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth,provider } from "./config";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {signInWithPopup} from "firebase/auth";
import { setGlobalState ,useGlobalState} from "./Global";
import First from "../LottieFiles/signup.json";
import {
  get,
  getDatabase,
  ref,
  set,
  child,
  remove,
  update,
  push,
  DataSnapshot,
} from "firebase/database";
import { Avatar, Divider, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function SignUp() {
  const [user, setUser] = useState({});
  const db = getDatabase();
  const [value,setValue] = useState('')
  const handleClick =()=>{
    signInWithPopup(auth, provider).then((re) => {
      console.log(re);
      console.log(re.user.uid);
setGlobalState("Name",re.user.displayName)
setGlobalState("Email",re.user.email)
setGlobalState("key",re.user.uid)
setGlobalState("profilePic",re.user.photoURL)
      localStorage.setItem("username", re.user.displayName);
      localStorage.setItem("Email", re.user.email);
      localStorage.setItem("id", re.user.uid);
      localStorage.setItem("pic", re.user.photoURL);
      localStorage.setItem("type","consumer")
      setUser({
        userid: re.user.uid,
        name: re.user.displayName,
        email: re.user.email,
        pic: re.user.photoURL,
      });
      

      update(ref(db, "users/" + re.user.uid), {
        userid: re.user.uid,
        name: re.user.displayName,
        email: re.user.email,
        pic:re.user.photoURL,
      })
        .then(() => {
          return Navigate("/welcome");
        })
        .catch((err) => {
          Navigate("/welcome");
        });
      // const user=result.user
    });
  
      
  }
useEffect(()=>{
  if(!user.userid==""){
    Navigate("/welcome")
  }
})
  useEffect(()=>{
    if (localStorage.id !== undefined) {
      setUser({
        userid: localStorage.id,
        name: localStorage.username,
        email: localStorage.Email,
        pic: localStorage.pic,
      });
      setValue(localStorage.getItem('email'))}
  },[])
   const Navigate=useNavigate();

  return (
    <div className="grid h-screen place-items-center">
      <div className=" md:w-[100%] w-full h-[100%]  md:flex  rounded-lg ">
        <div className="md:w-1/2 w-full  bg-blue-800">
          <div>
            <h1 className="text-[30px] font-[600] pl-5 pt-5 pr-5 text-white text-lrfy">
              {" "}
              LOGO
            </h1>
          </div>
          <div className="grid justify-center place-items-center ">
            <Lottie
              animationData={First}
              loop={true}
              className="w-[400px] mt-[100px]"
            ></Lottie>
          </div>
          <div>
            <h1 className="text-[30px] font-[600] pl-5 pr-5 text-white text-center">
              lorem ipsum <br></br>
            lorem ipsum
            </h1>
            <p className="text-[15px] pl-5 pr-5 text-white text-center pb-5">
              lorem ipsum
            </p>
          </div>
        </div>
        <div className="md:w-1/2 ">
            <div className="p-5 grid mt-[80px] place-content-center">
                <Avatar sx={{width:"100px",
                            height:'100px'
            }}></Avatar>
            </div>
            <div>
                <h1 className="text-[30px] font-[500] text-center">Lets Sign in!</h1>
              <p className="text-gray-400 text-center p-2">lorem ipsum</p>
            </div>
            <div className=" grid justify-center place-content-center mt-5">
                <div className="grid gap-3 w-[500px]"> 
                <TextField  id="outlined-basic" label="Email Id" variant="outlined" ></TextField>
                <TextField  id="outlined-basic" label="Password" variant="outlined" ></TextField>
                <button className="bg-blue-500 p-5 rounded text-white" onClick={handleClick}>
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>  Sign in  </button>
                
                <Divider>Or</Divider>
                <button className="bg-black p-5 rounded text-white" onClick={()=>{handleClick()}}>
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>  Sign in with google </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
