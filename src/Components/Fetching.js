import {
  get,
  getDatabase,
  ref,
  set,
  child,
  remove,
  update,
  push,
  Database,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

export default function Fetching() {
  let { type } = useParams();
  const [userid, setUserid] = useState("");

  setTimeout(() => {}, 500);
  useEffect(() => {
    if (userid !== "") {
      Navigate("/client/" + userid);
    }

    const db = getDatabase();

    const dbref = ref(db);
    get(child(dbref, "/client")).then((snapshot) => {
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
        function profile(value) {
          console.log(value);
        }
        for (let i = 0; i <= length; i++) {
          var path = Object.keys(snapshot.val())[i];
          console.log(path);

          const dbref = ref(db);
          get(child(dbref, "/client/" + path)).then((snapshot) => {
            if (type == snapshot.val().industry) {
              console.log(snapshot.val().userid);

              const holder = document.getElementById("holder");
              const maindiv = document.createElement("div");
              const leftdiv = document.createElement("div");
              const rightdiv = document.createElement("div");
              maindiv.classList.add("shadow-lg", "rounded-xl", "grid");
              maindiv.classList.add("mt-5");
              maindiv.classList.add("flex");
              const img = document.createElement("img");
              img.classList.add("rounded-xl");
              const name = document.createElement("h1");
              const description = document.createElement("p");
              const locationicon = document.createElement("div");
              const location = document.createElement("p");
              const location_holder = document.createElement("div");
              const button = document.createElement("button");

              button.innerText = "Book Now !";
              name.innerText = snapshot.val().name;
              img.src = snapshot.val().profilePic;
              img.style.width = "100px";

              leftdiv.classList.add("p-5");
              name.classList.add("text-[50px]", "font-[700]", "mb-5", "mt-5");
              description.classList.add("w-[50%]");
              description.innerText = snapshot.val().description;
              button.classList.add(
                "px-3",
                "py-2",
                "bg-black",
                "text-white",
                "rounded-lg",
                "mt-5"
              );
              button.name = snapshot.val().userid;
              button.onclick = function (event) {
                window.location.href = `https://vaa-hacksters.vercel.app/client/${event.target.name}`;
              };

              location_holder.classList.add("flex");
              locationicon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" id="locationIcon">
<path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path>
</svg> `;
              location.innerText = snapshot.val().location;
              location_holder.appendChild(locationicon);
              location_holder.appendChild(location);

              leftdiv.appendChild(img);
              leftdiv.appendChild(name);
              leftdiv.appendChild(location_holder);
              leftdiv.appendChild(description);
              leftdiv.appendChild(button);
              maindiv.appendChild(leftdiv);
              maindiv.appendChild(rightdiv);
              holder.appendChild(maindiv);
            }
          });
        }
      }
    });
  });

  return (
    <div class="p-5">
      <div class="item-left space-y-3">
        <div id="holder"></div>
      </div>
    </div>
  );
}
