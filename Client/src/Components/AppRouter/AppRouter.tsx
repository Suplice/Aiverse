import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "../../Pages/SignUp/SignUp";
import SignIn from "../../Pages/SignIn/SignIn";
import { AuthProvider } from "../../Utils/Context/AuthContext";
import UserPanel from "../../Pages/UserPanel/UserPanel";
import ManagerPanel from "../../Pages/ManagerPanel/ManagerPanel";
import LandingPage from "../../Pages/LandingPage/LandingPage";
import SearchServices from "../../Pages/SearchServices/SearchServices";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { AiServiceProvider } from "../../Utils/Context/AiServiceContext";
import FormPage from "../../Pages/FormPage/FormPage";
import CommentSection from "../CommentSection/CommentSection";
import { UserProvider } from "../../Utils/Context/UserContext";

const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <AiServiceProvider>
          <MantineProvider>
            <Routes>
              <Route path="auth">
                <Route path="SignUp" element={<SignUp />}></Route>
                <Route path="SignIn" element={<SignIn />}></Route>
              </Route>
              <Route path="user">
                <Route path="panel" element={<UserProvider> <UserPanel /> </UserProvider>}></Route>
              </Route>
              <Route path="manager">
                <Route path="panel" element={<ManagerPanel />}></Route>
              </Route>
              <Route path="forms" element={<FormPage />}></Route>
              <Route path="services" element={<SearchServices />}></Route>
              <Route path="*" element={<LandingPage />}></Route>
              <Route
                path="Comments"
                element={<CommentSection AiServiceId={1} />}
              ></Route>
            </Routes>
          </MantineProvider>
        </AiServiceProvider>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
