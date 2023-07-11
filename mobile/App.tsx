import { AppContextProvider } from "./src/contexts/AppContext";
import { AuthContextProvider } from "./src/contexts/AuthContext";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <AuthContextProvider>
      <AppContextProvider>
        <Routes />
      </AppContextProvider>
    </AuthContextProvider>
  );
}
