import logo from './logo.svg';
import './App.css';
import SignUp from './Components/userlogin';
import Welcome from './Components/Welcome';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { setGlobalState,useGlobalState } from './Components/Global';
import ClientSignIn from './Components/ClientLogin';
import ShopDetails from './Components/ShopDetails';
import ShopPlans from './Components/ShopPlans';
import ShopImg from './Components/ShopImg';
import Fetching from './Components/Fetching';


function App() {


  return (
    <div>
        <BrowserRouter>
 <Routes>
  <Route  path="/" element={<SignUp />}></Route>
  <Route index path="/client" element={<ClientSignIn />}></Route>
  <Route index path="/shopdetails" element={<ShopDetails />}></Route>
    <Route index path="/welcome" element={<Welcome />}></Route>
    <Route index path="/shopplans" element={<ShopPlans />}></Route>
    <Route index path="/shopimg" element={<ShopImg />}></Route>
    <Route index path="/fetching" element={<Fetching />}></Route>
</Routes>

    </BrowserRouter>
    </div>
  );
}

export default App;
