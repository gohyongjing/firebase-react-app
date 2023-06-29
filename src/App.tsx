import { AuthContextProvider } from "features/auth";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "routes";

export default function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AppRoutes />
      </AuthContextProvider>
    </BrowserRouter>
  );
}
