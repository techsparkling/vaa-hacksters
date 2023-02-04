import React from "react";
import Lottie from "lottie-react";
import { useState, useEffect } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { getStorage, ref as ref_storage, uploadBytes,getDownloadURL  } from "firebase/storage";
import { auth, provider } from "./config";
import AddIcon from '@mui/icons-material/Add';
import {IconButton} from "@mui/material";
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
export default function ShopDetails() {
    const [previewPic,setPreviewPic]=useState()
  const [profilePic,setProfilePic]=useState()
    const [user, setUser] = useState({});
    const db = getDatabase();
    const storage = getStorage();
    const [value, setValue] = useState('')
    const [name,setName]=useState('')
    const [industry,setIndustry]=useState('')
    const [description,setDescription]=useState('')
    
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
                        <p className="text-gray-400 text-center p-2">Client Login</p>
                    </div>
                    <div className=" grid justify-center place-content-center mt-5">
                        <div className="grid gap-3 w-[500px]">
                            <TextField id="outlined-basic" label="Name Of Your Business" value={name} onChange={(event)=>{
                                setName(event.target.value)
                            }}></TextField>

                            <div className="mt-5 w-full">
<FormControl fullWidth sx={{}}>
<InputLabel id="demo-simple-select-helper-label" sx={
    {
       
        "&.Mui-focused": {
          color: "#ff9100",
        },
    }
}>Industry</InputLabel>
        <Select
        value={industry}
        
         MenuProps={{
            sx: {
              "&& .Mui-selected": {
                backgroundColor: "#ff910047"
              }
            }
          }}
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          
          sx={{
            
            
            
            textAlign:"left",
            "& .MuiSvgIcon-root": {
                textAlign:"left",
            },
            
          }}
          onChange={(event)=>{
            setIndustry(event.target.value)
            console.log(event.target.value)
          }}
          label="Industry"
   fullWidth
        >
        
          
          <MenuItem value={"healthcare"}>Healthcare facilities (hospitals, clinics, dentists, etc.)</MenuItem>
          <MenuItem value={"salon"}>Beauty and wellness services (spas, salons, massage therapy, etc.)</MenuItem>
          <MenuItem value={"automotive"}>Automotive services (car dealerships, repair shops, oil change services, etc.)</MenuItem>
          <MenuItem value={"legal"}>Legal services (law firms, notaries, etc.)</MenuItem>
          <MenuItem value={"others"}>Others</MenuItem>
        </Select>
        </FormControl>
        </div>
                            <TextField
                                label="Description"
                                multiline
                                rows={2}
                                maxRows={4}
                                value={description}
                                onChange={(event)=>{
                                    setDescription(event.target.value)
                                }}
                            />
                            <div>
                                <Divider>   Insert Logo of your business</Divider>
                                <div className="grid justify-center mt-5"><IconButton varient="square" color="" sx={{
                                    postion: 'absolute'
                                }} aria-label="upload picture" component="label">
                                    <input hidden accept="image/*" type="file" onChange={(event) => {
                                        let url = URL.createObjectURL(event.target.files[0])
                                        setPreviewPic(url)
                                        setProfilePic(event.target.files[0])
                                        // handleChange(event.target.files[0])
                                        console.log(event.target.files[0])
                                        // console.log(previewPic)
                                    }} />

                                    <Avatar
                                    src={previewPic}
                                        sx={{ width:86, height: 86, bgcolor: 'gray' }}
                                    >


                                    </Avatar>
                                </IconButton>

                                </div>

                                <Divider>Click Next once everyfield is filled</Divider>
                                <button className="bg-black p-5 rounded text-white w-full mt-5" onClick={()=>{
                                        let path =`images/${profilePic.name+v4()}`
                                        const storageRef = ref_storage(storage,   path );
                                        uploadBytes(storageRef,profilePic).then(()=>{
                                            
                                            getDownloadURL(ref_storage(storage,path)).then((url)=>{
                                            update(ref(db, "client/" + localStorage.id), {
                                                name:name,
                                                description:description,
                                                industry:industry,
                                                profilePic:url,
                                
                                            }).then(()=>{
                                                return Navigate("/shopplans")
                                            }

                                            )
                                        })})}}>
                            
                                    <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>  Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            );
}
