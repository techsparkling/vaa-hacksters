import React from "react";
import Lottie from "lottie-react";
import First from "../LottieFiles/signup.json";
import { Avatar, TextField } from "@mui/material";
export default function SignUp() {
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
                <h1 className="text-[30px] font-[500] text-center">Lets Sign Up!</h1>
              <p className="text-gray-400 text-center p-2">lorem ipsum</p>
            </div>
            <div className=" grid justify-center place-content-center mt-5">
                <div className=" gap-3"> 
                <TextField  id="outlined-basic" label="Email Id" variant="outlined" ></TextField>
                <TextField  id="outlined-basic" label="Password" variant="outlined" ></TextField>
                
                
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
