import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import { AuthContextProvider, RequireAuth, RequireNoAuth } from "../contexts/useAuthContext";
import LogIn from "../pages/LogIn";

export const PATH_HOME = '/';
export const PATH_SIGN_UP = '/sign-up';
export const PATH_LOG_IN = '/log-in';
export const PATH_DASHBOARD = '/dashboard'

export default function App() {
  return (
       <BrowserRouter>
         <AuthContextProvider>
          <Routes>
            <Route path={PATH_HOME} element={
              <RequireNoAuth>
                <Home />
              </RequireNoAuth>
            } />
            <Route path={PATH_SIGN_UP} element={
              <RequireNoAuth>
                <SignUp />
              </RequireNoAuth>
            } />
            <Route path={PATH_LOG_IN} element={
              <RequireNoAuth>
                <LogIn />
              </RequireNoAuth>
            } />
            <Route path={PATH_DASHBOARD} element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }/>
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
  );
}
