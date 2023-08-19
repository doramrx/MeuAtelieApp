import { AppContextProvider } from "./src/contexts/AppContext";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <AppContextProvider>
      <Routes />
    </AppContextProvider>
  );
}
