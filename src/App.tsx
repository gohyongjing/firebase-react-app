import { AuthContextProvider } from "features/auth";
import { StyleThemeContextProvider } from "features/styleTheme/contexts";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "routes";

export default function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <StyleThemeContextProvider>
          <AppRoutes />
        </StyleThemeContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
