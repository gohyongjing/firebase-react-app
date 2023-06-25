import { AuthContextProvider } from "features/auth/contexts/useAuthContext";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AppRoutes />
      </AuthContextProvider>
    </BrowserRouter>
  );
}
