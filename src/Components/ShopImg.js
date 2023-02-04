import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Divider, IconButton } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import {
  getDatabase,
  ref, update
} from "firebase/database";
import { getDownloadURL, getStorage, ref as ref_storage, uploadBytes } from "firebase/storage";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import First from "../LottieFiles/signup.json";
import { auth, provider } from "./config";
import { setGlobalState } from "./Global";
export default function ShopImg() {
  const storage = getStorage();
  const [previewPic1, setPreviewPic1] = useState();
  const [profilePic1, setProfilePic1] = useState();
  const [previewPic2, setPreviewPic2] = useState();
  const [profilePic2, setProfilePic2] = useState();
  const [previewPic3, setPreviewPic3] = useState();
  const [profilePic3, setProfilePic3] = useState();
  const [previewPic4, setPreviewPic4] = useState();
  const [profilePic4, setProfilePic4] = useState();
  const [previewPic5, setPreviewPic5] = useState();
  const [profilePic5, setProfilePic5] = useState();
  const [user, setUser] = useState({});
  const db = getDatabase();
  const [value, setValue] = useState("");
  const handleClick = () => {
    signInWithPopup(auth, provider).then((re) => {
      console.log(re);
      console.log(re.user.uid);
      setGlobalState("Name", re.user.displayName);
      setGlobalState("Email", re.user.email);
      setGlobalState("key", re.user.uid);
      setGlobalState("profilePic", re.user.photoURL);
      localStorage.setItem("username", re.user.displayName);
      localStorage.setItem("Email", re.user.email);
      localStorage.setItem("id", re.user.uid);
      localStorage.setItem("pic", re.user.photoURL);
      localStorage.setItem("type", "client");
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
          return Navigate("/ShopDetails");
        })
        .catch((err) => {
          Navigate("/ShopDetails");
        });
    });
  };
  useEffect(() => {});
  useEffect(() => {
    if (localStorage.id !== undefined) {
      setUser({
        userid: localStorage.id,
        name: localStorage.username,
        email: localStorage.Email,
        pic: localStorage.pic,
      });
      setValue(localStorage.getItem("email"));
    }
  }, []);
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
              Shop Images
            </h1>
            {/* <p className="text-[15px] pl-5 pr-5 text-white text-center pb-5">
              lorem ipsum
            </p> */}
          </div>
        </div>
        <div className="md:w-1/2 ">
          <div className="p-5 grid mt-[80px] place-content-center">
            <Avatar sx={{ width: "100px", height: "100px" }}></Avatar>
          </div>
          <div>
            <h1 className="text-[30px] font-[500] text-center">
              Lets Sign in!
            </h1>
            <p className="text-gray-400 text-center p-2">Client Login</p>
          </div>
          <div className=" grid justify-center place-content-center mt-5">
            <div className="grid gap-3 w-[500px]">
              <Divider> Add in images of your office</Divider>
              <div className="grid justify-center mt-5">
                <IconButton
                  varient="square"
                  color=""
                  sx={{
                    postion: "absolute",
                  }}
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(event) => {
                      if (previewPic1 === undefined) {
                        let url = URL.createObjectURL(event.target.files[0]);
                        setPreviewPic1(url);
                        setProfilePic1(event.target.files[0]);
                        // handleChange(event.target.files[0])
                        console.log(event.target.files[0]);
                      } else if (previewPic2 == undefined) {
                        let url = URL.createObjectURL(event.target.files[0]);
                        setPreviewPic2(url);
                        setProfilePic2(event.target.files[0]);
                        console.log(event.target.files[0]);
                      } else if (previewPic3 == undefined) {
                        let url = URL.createObjectURL(event.target.files[0]);
                        setPreviewPic3(url);
                        setProfilePic3(event.target.files[0]);
                        console.log(event.target.files[0]);
                      } else if (previewPic4 == undefined) {
                        let url = URL.createObjectURL(event.target.files[0]);
                        setPreviewPic4(url);
                        setProfilePic4(event.target.files[0]);
                        console.log(event.target.files[0]);
                      } else if (previewPic5 == undefined) {
                        let url = URL.createObjectURL(event.target.files[0]);
                        setPreviewPic5(url);
                        setProfilePic5(event.target.files[0]);
                        console.log(event.target.files[0]);
                      }
                      // console.log(previewPic)
                    }}
                  />

                  <Avatar
                    src={"https://cdn-icons-png.flaticon.com/512/148/148764.png"}
                    sx={{ width: 86, height: 86, bgcolor: "gray" }}
                  ></Avatar>
                </IconButton>
              </div>
              <div className="flex gap-5 justify-start">
                <Avatar
                  src={previewPic1}
                  variant="square"
                  sx={{ width: "90px", height: "90px" }}
                ></Avatar>

                <Avatar
                  src={previewPic2}
                  variant="square"
                  sx={{ width: "90px", height: "90px" }}
                ></Avatar>
                <Avatar
                  src={previewPic3}
                  variant="square"
                  sx={{ width: "90px", height: "90px" }}
                ></Avatar>
                <Avatar
                  src={previewPic4}
                  variant="square"
                  sx={{ width: "90px", height: "90px" }}
                ></Avatar>
                <Avatar
                  src={previewPic5}
                  variant="square"
                  sx={{ width: "90px", height: "90px" }}
                ></Avatar>
              </div>
            </div>
            <div className="grid mt-5">
              <Divider>Only Click Once 5 Pictures Are Uploaded</Divider>
              <button
                className="bg-black p-5 rounded text-white w-full mt-5"
                onClick={() => {
                  if (profilePic1 !== undefined) {
                    let path = `images/${profilePic1.name + v4()}`;
                    const storageRef = ref_storage(storage, path);

                    uploadBytes(storageRef, profilePic1).then(() => {
                      getDownloadURL(ref_storage(storage, path)).then((url) => {
                        update(
                          ref(db, "client/" + localStorage.id + "/images"),
                          {
                            picture1: url,
                          }
                        ).then(() => {
                          return Navigate("/shopplans");
                        });
                      });
                    });
                  }
                  if (profilePic2 !== undefined) {
                    let path = `images/${profilePic2.name + v4()}`;
                    const storageRef = ref_storage(storage, path);

                    uploadBytes(storageRef, profilePic2).then(() => {
                      getDownloadURL(ref_storage(storage, path)).then((url) => {
                        update(
                          ref(db, "client/" + localStorage.id + "/images"),
                          {
                            picture2: url,
                          }
                        ).then(() => {});
                      });
                    });
                  }
                  if (profilePic3 !== undefined) {
                    let path = `images/${profilePic3.name + v4()}`;
                    const storageRef = ref_storage(storage, path);

                    uploadBytes(storageRef, profilePic3).then(() => {
                      getDownloadURL(ref_storage(storage, path)).then((url) => {
                        update(
                          ref(db, "client/" + localStorage.id + "/images"),
                          {
                            picture3: url,
                          }
                        ).then(() => {});
                      });
                    });
                  }
                  if (profilePic4 !== undefined) {
                    let path = `images/${profilePic4.name + v4()}`;
                    const storageRef = ref_storage(storage, path);

                    uploadBytes(storageRef, profilePic4).then(() => {
                      getDownloadURL(ref_storage(storage, path)).then((url) => {
                        update(
                          ref(db, "client/" + localStorage.id + "/images"),
                          {
                            picture4: url,
                          }
                        ).then(() => {});
                      });
                    });
                  }
                  if (profilePic5 !== undefined) {
                    let path = `images/${profilePic5.name + v4()}`;
                    const storageRef = ref_storage(storage, path);

                    uploadBytes(storageRef, profilePic5).then(() => {
                      getDownloadURL(ref_storage(storage, path)).then((url) => {
                        update(
                          ref(db, "client/" + localStorage.id + "/images"),
                          {
                            picture5: url,
                          }
                        ).then(() => {});
                      });
                    });
                  }

                  return Navigate("/welcome");
                }}
              >
                <FontAwesomeIcon icon></FontAwesomeIcon> Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
