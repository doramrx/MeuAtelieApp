import { AuthContextProvider } from "./src/contexts/AuthContext";
import { Routes } from "./src/routes";
import { CustomerDetail } from "./src/screens/CustomerDetail";

export default function App() {
  return (
    <CustomerDetail />
    // <AuthContextProvider>
    //   <Routes />
    // </AuthContextProvider>
  );
}
