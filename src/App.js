import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ClientSignIn from './Components/ClientLogin';
import Fetching from './Components/Fetching';
import ShopDetails from './Components/ShopDetails';
import ShopImg from './Components/ShopImg';
import ShopPlans from './Components/ShopPlans';
import SignUp from './Components/userlogin';
import Welcome from './Components/Welcome';
import 'react-toastify/dist/ReactToastify.css';
import Appointment from './Components/Appointments';
import Profile from './Components/Profile';
import { ToastContainer,toast } from 'react-toastify';


function App() {


  return (
    <div>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
        <BrowserRouter>
 <Routes>
  <Route  path="/" element={<SignUp />}></Route>
  <Route index path="/client" element={<ClientSignIn />}></Route>
  <Route index path="/shopdetails" element={<ShopDetails />}></Route>
    <Route index path="/welcome" element={<Welcome />}></Route>
    <Route index path="/shopplans" element={<ShopPlans />}></Route>
    <Route index path="/shopimg" element={<ShopImg />}></Route>
    <Route index path="/client/:id" element={<Profile />}></Route>
    <Route index path="/fetching/:type" element={<Fetching />}></Route>
</Routes>

    </BrowserRouter>
    </div>
  );
}

export default App;
