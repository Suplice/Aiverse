import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "../../Pages/SignUp/SignUp";
import SignIn from "../../Pages/SignIn/SignIn";
import { AuthProvider } from "../../Utils/Context/AuthContext";
import UserPanel from "../../Pages/UserPanel/UserPanel";
import FirstComponent from "../FirstComponent";

const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="auth">
            <Route path="SignUp" element={<SignUp />}></Route>
            <Route path="SignIn" element={<SignIn />}></Route>
          </Route>
          <Route path="/user/panel" element={<UserPanel />} />
          <Route path="*" element={<FirstComponent />}></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
