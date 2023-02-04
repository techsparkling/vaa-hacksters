import {  get,
    getDatabase,
    ref,
    set,
    child,
    remove,
    update,
    push,
    Database,} from "firebase/database";
import React, { useEffect } from "react";

 
export default function Fetching(){
    useEffect(()=>{
        const db = getDatabase();

        const dbref = ref(db)
            get(child(dbref, "/client" ))
            .then((snapshot) => {
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
                        get(
                            child(
                                dbref,
                                "/client/" + path
                            )
                        )
                            .then((snapshot) => {
                               const holder=document.getElementById('holder')
                               const maindiv=document.createElement('div')
                               console.log(snapshot.val())
                               maindiv.classList.add('main')
                               maindiv.style="display:grid ; margin-top:10px; "
                               maindiv.innerHTML=`
                               <div style="margin-top:10px ;    margin-top: 10px;
                               padding: 5px;
                               box-shadow: 0px 0px 20px 6px #80808045;
                               padding: 50px;
                               border-radius: 10px;"> 
            <img src="${snapshot.val().pic}" alt="" id="logoImg" height="120px" width="120px">
            <h1 id="shopName" style="font-size:10">${snapshot.val().name}</h1><br>
            <div id="location">
              <!-- icon svg -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" id="locationIcon">
                <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
              </svg>
              <span>${snapshot.val().location}</span><br><br>
            </div>
            <p id="para-text " class="p">
              ${snapshot.val().description}
            </p><br>
            <img >
            <button id="booking">Book Now!</button>
            <!-- rattings -->
          </div>
          <div class="item-right">
        
          </div>
        </div>
        </div>
        <br/><br/>
        
        
        `
        holder.appendChild(maindiv)
        
                                
                                
                            })
                               
        
        
                            }}})
                        
                        
    },[])
    
                return(
                    <div class="p-5">
  <div class="item-left space-y-3">
                    <div id="holder"></div></div></div>
                )
                }