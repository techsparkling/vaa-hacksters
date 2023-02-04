import React from "react";
import Lottie from "lottie-react";
import { useState, useEffect } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import { v4 } from "uuid";

import { useNavigate } from "react-router-dom";
import { getStorage, ref as ref_storage, uploadBytes,getDownloadURL  } from "firebase/storage";
import { auth, provider } from "./config";
import AddIcon from '@mui/icons-material/Add';
import {Button, IconButton} from "@mui/material";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { signInWithPopup } from "firebase/auth";
import { setGlobalState, useGlobalState } from "./Global";
import {InputLabel} from "@mui/material";
import First from "../LottieFiles/signup.json";
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {MenuItem} from "@mui/material";
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
import { HdrPlus, PlusOne, Subject } from "@mui/icons-material";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
export default function ShopPlans() {
    const [price,setPrice]=useState()
    const [service,setService]=useState('')
    let services_object={}
    function add(){
    
        let services_size=Object.keys(services_object).length
      services_object[services_size+1]={name:service,price:price}
      console.log(services_object)
      let holder=document.getElementById('price_holder')
      let div= document.createElement('div')
      let h1=document.createElement('h1')  
      let p=document.createElement('p')
      div.classList.add('p-5')
      div.classList.add("border-2")
      div.classList.add("mt-5")

    h1.innerText=service
    p.innerText=`₹ ${price}`
    div.appendChild(h1)
    div.appendChild(p)
    holder.appendChild(div)
    

    }
    
    const [previewPic,setPreviewPic]=useState()
  const [profilePic,setProfilePic]=useState()
    const [user, setUser] = useState({});
    
    const db = getDatabase();
    const storage = getStorage();
    const [value, setValue] = useState('')
  
    const handleClick = () => {
        signInWithPopup(auth, provider).then((re) => {
            console.log(re);
            console.log(re.user.uid);
            setGlobalState("Name", re.user.displayName)
            setGlobalState("Email", re.user.email)
            setGlobalState("key", re.user.uid)
            setGlobalState("profilePic", re.user.photoURL)
            localStorage.setItem("username", re.user.displayName);
            localStorage.setItem("Email", re.user.email);
            localStorage.setItem("id", re.user.uid);
            localStorage.setItem("pic", re.user.photoURL);
            localStorage.setItem("type", "client")
            setUser({
                userid: re.user.uid,
                name: re.user.displayName,
                email: re.user.email,
                pic: re.user.photoURL,
            });


            update(ref(db, "client/" + re.user.uid), {
                userid: re.user.uid,
                name: re.user.displayName,
                email: re.user.email,
                pic: re.user.photoURL,

            })
                .then(() => {
                    return Navigate("/welcome");
                })
                .catch((err) => {
                    Navigate("/welcome");
                });

        });


    }
    useEffect(() => {

    })
    useEffect(() => {
        if (localStorage.id !== undefined) {
            setUser({
                userid: localStorage.id,
                name: localStorage.username,
                email: localStorage.Email,
                pic: localStorage.pic,
            });
            setValue(localStorage.getItem('email'))
        }
    }, [])
    const Navigate = useNavigate();

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
                        <Avatar sx={{
                            width: "100px",
                            height: '100px'
                        }}></Avatar>
                    </div>
                    <div>
                        <h1 className="text-[30px] font-[500] text-center">Lets Fill in info!</h1>
                        <p className="text-gray-400 text-center p-2">Client signup</p>

                    </div>
                    <div className="  justify-center place-content-center mt-5">
                        <div className="p-5 w-full">
                            <Divider>Create Your Pricings</Divider>
                            <div className="grid">
                                <TextField label="Enter the Service Name" value={service} onChange={(event)=>{
setService(event.target.value)
                                }}></TextField> 
                                
                                <TextField   className="mt-16" type="number" value={price} onChange={(event)=>{
setPrice(event.target.value)
                                }} label="Amount"></TextField>
                                <button className="p-5 bg-green-500 rounded-lg text-white w-[200px] mt-5" onClick={add}>Add Service </button>

                            </div>
                            <div className="" id="price_holder">

                            </div>
                            <div>
                            <button className="bg-black p-5 rounded text-white w-full mt-5" 
                                            onClick={()=>{
                                                update(ref(db, "client/" + localStorage.id), {
                                                   plans:services_object
                                    
                                                })
                                                    .then(() => {
                                                     Navigate('/ShopImg')
                                                    })
                                            }}
                                        >
                            
                                    <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>  Next</button>
                                </div>
                        </div>
                    </div>
                    </div>
                    </div>
            </div>
            );
}
