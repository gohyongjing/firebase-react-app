import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../contexts/useAuthContext";
import AppRoutes from "./AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AppRoutes />
      </AuthContextProvider>
    </BrowserRouter>
  );
}
