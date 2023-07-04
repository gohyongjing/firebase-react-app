import { useAuthContext, SignIn, SignUp } from "features/auth";
import { Dashboard, Home } from "pages";
import { Navigate, Route, Routes } from "react-router-dom";

export const PATH_HOME = '/';
export const PATH_SIGN_UP = '/sign-up';
export const PATH_SIGN_IN = '/sign-in';
export const PATH_DASHBOARD = '/dashboard'

interface Props {
  children?: JSX.Element | null;
}

function RequireAuth({ children=null }: Props) {
  const user = useAuthContext();

  return user ? children : <Navigate replace to={PATH_SIGN_IN}/>;
}

function RequireNoAuth({ children=null }: Props) {
  const user = useAuthContext();

  return user ? <Navigate replace to={PATH_DASHBOARD}/> : children;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path={PATH_HOME} element={
        <RequireNoAuth><Home/></RequireNoAuth>
      }/>
      <Route path={PATH_SIGN_UP} element={
        <RequireNoAuth><SignUp/></RequireNoAuth>
      }/>
      <Route path={PATH_SIGN_IN} element={
        <RequireNoAuth><SignIn/></RequireNoAuth>
      }/>
      <Route path={PATH_DASHBOARD} element={
        <RequireAuth><Dashboard/></RequireAuth>
      }/>
    </Routes>
  );
}
