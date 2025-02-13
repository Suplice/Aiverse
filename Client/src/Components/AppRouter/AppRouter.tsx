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
import AIViewPage from "../../Pages/AIViewPage/AIViewPage";
import { UserProvider } from "../../Utils/Context/UserContext";
import ProtectedRoute from "./ProtectedRoute";
import AIReviewPage from "../../Pages/AIReviewPage/AIReviewPage";

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

              <Route path="services" element={<SearchServices />}></Route>
              <Route path="*" element={<LandingPage />}></Route>

              <Route
                element={
                  <ProtectedRoute
                    allowedRoles={["USER", "MODERATOR", "ADMIN"]}
                  />
                }
              >
                <Route path="user">
                  <Route
                    path="panel"
                    element={
                      <UserProvider>
                        <UserPanel />
                      </UserProvider>
                    }
                  ></Route>
                </Route>
              </Route>

              <Route
                element={
                  <ProtectedRoute allowedRoles={["MODERATOR", "ADMIN"]} />
                }
              >
                <Route path="manager">
                  <Route path="panel" element={<ManagerPanel />}></Route>
                  <Route path="review/:id" element={<AIReviewPage />}></Route>
                </Route>
              </Route>
              <Route path="aiservice/:id" element={<AIViewPage />}></Route>

              <Route
                element={
                  <ProtectedRoute
                    allowedRoles={["USER", "MODERATOR", "ADMIN"]}
                  />
                }
              >
                <Route path="forms" element={<FormPage />}></Route>
              </Route>
            </Routes>
          </MantineProvider>
        </AiServiceProvider>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
