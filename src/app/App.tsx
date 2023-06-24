import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import AppContextProvider from "../contexts/useAppContext";

export default function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <AppRoutes />
      </AppContextProvider>
    </BrowserRouter>
  );
}
