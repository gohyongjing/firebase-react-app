import { AuthContextProvider } from "features/auth";
import { StyleThemeContextProvider } from "features/styleTheme";
import { BrowserRouter } from "lib/reactRouterDom";
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
