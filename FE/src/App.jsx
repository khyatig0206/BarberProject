import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Verify from "./pages/Verify";
import HomePage from "./pages/HomePage";
import GoogleCallback from "./pages/googleCallback";
import AdminAppointmentsPage from "./pages/Admin";
import PrivateRoute from "./components/PrivateRoute";
import AboutUs from "./pages/AboutUs";
import MyAppointments from "./pages/MyAppointments";
import MyPayments from "./pages/MyPayments";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => (
 
  <Router>
     <ToastContainer/>
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/aboutus" element={<AboutUs/>} />
      <Route path="/myappointments" element={ <MyAppointments />  }  />
      <Route path="/mypayments" element={ <MyPayments /> }  />
      <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} /> 
      <Route path="/callback" element={<GoogleCallback/>} />
      <Route path="/admin" element={<PrivateRoute > <AdminAppointmentsPage/> </PrivateRoute> }/>

    </Routes>
  </Router>
);

export default App;
