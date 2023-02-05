import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  get,
  child,
  ref,
  getDatabase,
  update,
  set,
  push,
} from "firebase/database";
import { ToastContainer,toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "swiper/css";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  json,
} from "react-router-dom";
import { Divider } from "@mui/material";
export default function Profile() {
  const [value, setValue] = useState();
  const [chooseplan, setChooseplan] = useState(false);
  const [userkey, setUserKey] = useState("");
  const [planName, setPlanName] = useState("");
  const [planPrice, setPlanPrice] = useState("");
  useEffect(() => {
    get(child(dbref, "/client/" + id + "/plans")).then((snapshot) => {
      if (snapshot.val()) {
        var length = Object.keys(snapshot.val()).length;
        console.log(length);

        //    let arr = Object.values(snapshot.val())
        //     return(
        //         <div>
        //             {arr.map( ()=> {
        //                 return(
        //                     <p key='3'>gwreigfs</p>
        //                 )
        //             })}
        //         </div>

        for (let i = 0; i <= length; i++) {
          var path = Object.keys(snapshot.val())[i];
          console.log(path);

          const dbref = ref(db);
          get(child(dbref, "/client/" + id + "/plans/" + path)).then(
            (snapshot) => {
              if (snapshot.val()) {
                console.log(snapshot.val());
                let holder = document.getElementById("price_holder");
                let button = document.createElement("button");
                let div = document.createElement("div");
                div.classList.add("p-5", "border-2", "text-black", "w-[300px]");
                let svgholder = document.createElement("div");
                svgholder.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
</svg>
`;
                let name = document.createElement("h1");

                let price = document.createElement("p");
                price.innerText = `₹ ${snapshot.val().price}`;
                name.innerText = snapshot.val().name;
                button.innerText = "Book Appointment";
                button.classList.add("bg-green-500", "p-5");
                div.appendChild(name);

                div.onclick = function (event) {
                  document.getElementById("appointment").style.display = "grid";
                  setChooseplan(!chooseplan);
                };
                div.appendChild(price);
                div.appendChild(svgholder);

                holder.appendChild(div);
              }
              if (!chooseplan) {
                document.getElementById("appointment").style.display = "none";
              } else {
                document.getElementById("appointment").style.display = "block";
              }
            }
          );
        }
      }
    });
  }, []);
  const db = getDatabase();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [profileUrl, setProfileUrl] = useState();
  const [photo1, setPhoto1] = useState();
  const [photo2, setPhoto2] = useState();
  const [photo3, setPhoto3] = useState();
  const [photo4, setPhoto4] = useState();
  const [photo5, setPhoto5] = useState();
  const [location, setLocation] = useState();
  const [type, setType] = useState();
  const dbref = ref(db);
  let { id } = useParams();
  console.log(id);
  get(child(dbref, "/client/" + id)).then((snapshot) => {
    console.log(snapshot.val());
    setName(snapshot.val().name);
    setUserKey(snapshot.val().userid);
    setDescription(snapshot.val().description);
    setLocation(snapshot.val().location);
    setProfileUrl(snapshot.val().profilePic);
    setPhoto1(snapshot.val().images.picture1);

    setPhoto2(snapshot.val().images.picture2);
    setPhoto3(snapshot.val().images.picture3);
    setPhoto4(snapshot.val().images.picture4);
    setPhoto5(snapshot.val().images.picture5);
  });
  return (
    <div>
      <div
        id="appointment"
        className="p-5 absolute w-full h-full hidden flex justify-center z-[10] backdrop-blur-lg content-center"
      >
        <div className="bg-white shadow-lg p-5 h-[400px] w-[400px] rounded-xl ">
          <div>
            <h1 className="text-[30px] font-[700]">Book Appointment</h1>
          </div>
          <div className="mt-5">
            <Divider></Divider>
          </div>

          <div className="mt-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="DateTimePicker"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                  console.log(newValue.$d);
                }}
              />
            </LocalizationProvider>
          </div>
          <button
            className="bg-green-500 p-5 text-white  mt-5 rounded-xl"
            onClick={() => {
              let timevalue = toString(value);
              console.log(typeof(value))
              push(ref(db, "client/" + userkey + "/occupied/"), {
                time: timevalue,
              }).then(() => {

                toast('Appointment Booked Successfully', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  });
              });
            }}
          >
            Book Appointment
          </button>
        </div>
        <div></div>
      </div>
      <section class="text-gray-400 bg-white-900 body-font">
        <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <img
              src={profileUrl}
              className="w-[90px] h-[90px] rounded-lg "
            ></img>
            <h1 class="title-font sm:text-6xl text-3xl mb-4 font-medium text-black">
              {name}
              <br class="hidden lg:inline-block " />
              <span class="text-purple-400 text-2xl">
                <FontAwesomeIcon icon={faLocationPin}></FontAwesomeIcon>
                {location}
              </span>
            </h1>
            <p class="mb-8 leading-relaxed">{description}</p>
            <div class="flex justify-center"></div>
          </div>
          <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
              >
                <SwiperSlide>
                  <img
                    src={photo1}
                    className="w-[720px] h-[500px] rounded-xl"
                  ></img>
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src={photo2}
                    className="w-[720px] h-[500px] rounded-xl"
                  ></img>
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src={photo3}
                    className="w-[720px] h-[500px] rounded-xl"
                  ></img>
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src={photo4}
                    className="w-[720px] h-[500px] rounded-xl"
                  ></img>
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src={photo5}
                    className="w-[720px] h-[500px] rounded-xl"
                  ></img>
                </SwiperSlide>
              </Swiper>
            </Swiper>
          </div>
        </div>
      </section>

      <section class="text-gray-400 body-font ">
        <div class=" px-5 py-14 mx-auto">
          <div class="flex flex-col text-center w-full mb-20">
            {/* <h2 class="text-xs text-purple-400 tracking-widest font-medium title-font mb-1">ROOF PARTY POLAROID</h2>  */}
            <h1 class="sm:text-6xl text-9xl font-medium title-font mb-4 text-black">
              Our range of <span class="text-purple-400">Services.</span>
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              We have quite a large range of services that cater to a large
              group of Individuals, with affordable prices!
              <br />
              Choose the one you want and book your exclusive appointment now!
            </p>
          </div>
        </div>
      </section>

      <section class="text-gray-400  body-font">
        <div id="price_holder" className="flex gap-5 justify-center p-5 "></div>
        {/* <div class="container px-5 py-14 mx-auto flex flex-wrap justify-center">
            <div class="flex flex-col flex-wrap -m-4">
                <div class="p-4 md:w-full">
                    <div class="flex border-2 rounded-lg border-gray-800 p-8 sm:flex-row flex-col">
                        <div
                            class="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-gray-800 text-purple-400 flex-shrink-0">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2" class="w-8 h-8" viewBox="0 0 24 24">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                        </div>
                        <div class="flex-grow">
                            <h2 class="text-black text-lg title-font font-medium mb-3">Service name</h2>
                            <p class="leading-relaxed text-base">2000/-</p>
                            <a class="mt-3 text-purple-400 inline-flex items-center">
                                <a href="#_"
                                    class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-purple-400 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
                                    <span
                                        class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-purple-400 group-hover:h-full"></span>
                                    <span
                                        class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                                        <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                        </svg>
                                    </span>
                                    <span
                                        class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                                        <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                        </svg>
                                    </span>
                                    <span
                                        class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-black">Book
                                        Now</span>
                                </a>

                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div> */}
      </section>
    </div>
  );
}
