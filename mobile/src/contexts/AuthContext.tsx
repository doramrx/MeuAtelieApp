import { createContext, ReactNode, useState } from "react";

interface AuthContextData {
  userId: number | null;
  logOut: () => void;
  logIn: (id: number) => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [userId, setUserId] = useState<number | null>(null);

  function logOut() {
    setUserId(null);
  }

  function logIn(id: number) {
    setUserId(id);
  }

  return (
    <AuthContext.Provider
      value={{
        userId,
        logOut,
        logIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
