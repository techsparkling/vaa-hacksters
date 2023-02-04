import { Avatar, Box } from "@mui/material";
import Collapse from '@mui/material/Collapse';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
export default function Welcome() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [profilePic, setProfilePic] = useState();
  const [key, setKey] = useState();
  const [user,setUser]=useState(false)
  const Navigate = useNavigate();
  useEffect(() => {
    if (localStorage) {
      setName(localStorage.getItem("username"));
      setProfilePic(localStorage.getItem("pic"));
    } else {
    }
  }, []);

  // console.log(key,name,email,profileUrl)
  return (
    

      <div className="bg-slate-500 relative">
      <section style ={{ backgroundImage: "url('https://static.vecteezy.com/packs/media/vectors/term-bg-1-3d6355ab.jpg')" }} className="h-[35rem] bg-center bg-cover text-white">
        <nav className="flex justify-around">
          <h1 className="text-[30px] font-[600] pl-5 pt-5 pr-5 text-white text-lrfy">
              {" "}
              EventEase
          </h1>
          {/* <img
            src="https://res.cloudinary.com/urbanclap/image/upload/images/growth/home-screen/1631097450980-d2de38.png"
            alt=""
            height="60px"
            width="200px"
          /> */}

          <ul className="flex justify-evenly items-center space-x-7 text-white text-xl">
            <li><strong>Blog</strong></li>
            <li><strong>Register as a professional</strong></li>
            <li><strong>Help</strong></li>
           
          </ul>
          <div className="rounded p-5 flex justify-center">
                <div className="grid">
            <button onClick={()=>{
                setUser(!user)
            }}><Avatar src={localStorage.pic}></Avatar></button>
            {/* <li className="text-white">{(localStorage?localStorage.username:"Not logged in" )}</li> */}
            <Collapse in={user}>
            <Box className="gap-0 bg-black p-5 pt-0 absolute  ">
              <h1 className="text-left text-[20px]">
                <ul className="p-5">
                    <li className="p-5 clickable">Profile</li>
                    <li className="p-5 clickable">Settings</li>
                    <li className="p-5 clickable"><button onClick={localStorage.clear()}>Log Out</button></li>
                </ul>
              </h1>
            </Box>
          </Collapse>
          </div>
            </div>
        </nav>

        <div className="flex flex-col justify-center items-center m-[10rem] space-y-4">
          
<br></br>
          <h1 style={{"text-align": "center"}} className="text-[2em] font-bold">Effortless Event Planning,<br></br> In The Palm Of Your Hand</h1>

          <div className="flex space-x-4 text-black">
            <input
              style={{"text-align": "center"}}
              type="text"
              className="rounded-lg px-20 py-3"
              placeholder="Search For Services"
            />
          </div>
        </div>
      </section>

      <div
        className="cards_home flex flex-wrap justify-center items-center space-x-5 rounded-lg h-50 min-w-[75%] absolute top-[30rem] left-[50%] translate-x-[-50%] bg-white"
        style={{ boxShadow: "0 8px 26px 0 rgba(0,0,0,0.08)" }}
      >
        <a href="">
          <div className="cursor-pointer flex p-2 flex-col justify-center items-center space-y-4 m-6 hover:bg-gray-100 hover:rounded-md hover:transition">
            <img
              src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/images/growth/home-screen/1609757635235-1a139e.png"
              alt=""
              className="object-cover"
            />
            <p>Salon for Women</p>
          </div>
        </a>

        <a href="">
          <div className="cursor-pointer flex flex-col justify-center items-center space-y-4 m-6 hover:bg-gray-100 hover:rounded-md hover:transition p-2">
            <img
              src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/images/growth/home-screen/1629973621437-ce5af9.png"
              alt=""
            />
            <p>Salon for Women</p>
          </div>
          </a>
          <a href="">
              <div className="cursor-pointer flex flex-col justify-center items-center space-y-4 m-6 hover:bg-gray-100 hover:rounded-md hover:transition p-2">
                <img
                  src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/categories/category_v2/category_1312fb60.png"
                  alt=""
                  className="h-16"
                />
                <p>Salon for Women</p>
              </div>
            </a>

            <a href="">
              <div className="cursor-pointer flex flex-col justify-center items-center space-y-4 m-6 hover:bg-gray-100 hover:rounded-md hover:transition p-2">
                <img
                  src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_64/t_high_res_template/images/growth/home-screen/1629973621437-ce5af9.png"
                  alt=""
                />
                <p>Salon for Women</p>
              </div>
            </a>
        </div>

</div>


  );
}
