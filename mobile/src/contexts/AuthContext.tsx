import { createContext, ReactNode, SetStateAction, Dispatch, useState } from "react";

interface AuthContextData {
    userId: number | null;
    setSetUserId: Dispatch<SetStateAction<number | null>>;
}

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({
    children
}: AuthContextProviderProps) {

    const [userId, setSetUserId] = useState<number | null>(null);

    return (
        <AuthContext.Provider
            value={{
                userId,
                setSetUserId
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}