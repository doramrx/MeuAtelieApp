import {
    createContext,
    ReactNode,
    SetStateAction,
    Dispatch,
    useState,
} from "react";

interface AuthContextData {
    userId: number | null;
    setSetUserId: Dispatch<SetStateAction<number | null>>;
    isAdm: boolean;
    setIsAdm: Dispatch<SetStateAction<boolean>>;
}

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [userId, setSetUserId] = useState<number | null>(null);
    const [isAdm, setIsAdm] = useState(false);

    return (
        <AuthContext.Provider
            value={{
                userId,
                setSetUserId,
                isAdm,
                setIsAdm,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
