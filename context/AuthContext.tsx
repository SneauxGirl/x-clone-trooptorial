'use client'

import { auth } from "@/lib/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

interface AuthContextType {
    user: User | null;
}

const AuthContext = createContext<AuthContextType>({ user:null});

export function AuthProvider({ children}: { children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    return <AuthContext.Provider value={{ user}}>{children}</AuthContext.Provider>;

}

export function useAuth() {
    return useContext(AuthContext);
}