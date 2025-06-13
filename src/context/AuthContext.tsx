import { account } from "@/database/appwrite";
import { createContext, ReactNode, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";

interface IAuthProviderInterface {
    children: ReactNode
}


interface IAuthContextInterface {
    user: Models.User<Models.Preferences> | null;
    isLoadingUser: boolean
    signUp: (name: string, email: string, password: string) => Promise<string | null>
    signIn: (email: string, password: string) => Promise<string | null>
}

export const AuthContext = createContext<IAuthContextInterface>({} as IAuthContextInterface)



export function AuthProvider({ children }: IAuthProviderInterface) {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null)
    const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true)

    async function getUser() {
        try {
            const session = await account.get();
            setUser(session)
        } catch (error) {
            setUser(null)
        } finally {
            setIsLoadingUser(false)
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    async function signUp(name: string, email: string, password: string): Promise<string | null> {

        try {
            await account.create(ID.unique(), email, password, name)

            await signIn(email, password)
            return null
        } catch (error) {
            if (error instanceof Error) {
                return error.message
            }

            return 'Algo de errado aconteceu ao tentar criar conta.'
        }
    }

    async function signIn(email: string, password: string): Promise<string | null> {
        try {
            await account.createEmailPasswordSession(email, password)

            await signIn(email, password)
            return null
        } catch (error) {
            if (error instanceof Error) {
                return error.message
            }

            return 'Algo de errado aconteceu ao tentar acessar conta.'
        }
    }

    return <AuthContext.Provider value={{
        user,
        isLoadingUser,
        signIn,
        signUp
    }}>
        {children}
    </AuthContext.Provider>
}