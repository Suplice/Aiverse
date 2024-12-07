import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "../../Pages/SignUp/SignUp";
import SignIn from "../../Pages/SignIn/SignIn";
import FirstComponent from "../FirstComponent";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="auth">
          <Route path="SignUp" element={<SignUp />}></Route>
          <Route path="SignIn" element={<SignIn />}></Route>
        </Route>
        <Route path="*" element={<FirstComponent />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
