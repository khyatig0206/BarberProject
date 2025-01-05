import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Verify from "./pages/Verify";
import HomePage from "./pages/HomePage";
import GoogleCallback from "./pages/googleCallback";
const App = () => (
  <Router>
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/callback" element={<GoogleCallback/>} />
    </Routes>
  </Router>
);

export default App;
