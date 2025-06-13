import { account } from "@/database/appwrite";
import { createContext, ReactNode } from "react";
import { ID } from "react-native-appwrite";

interface IAuthProviderInterface {
    children: ReactNode
}


interface IAuthContextInterface {
    // user: Models.User<Models.Preferences> | null;
    signUp: (name: string, email: string, password: string) => Promise<string | null>
    signIn: (email: string, password: string) => Promise<string | null>
}

export const AuthContext = createContext<IAuthContextInterface>({} as IAuthContextInterface)



export function AuthProvider({ children }: IAuthProviderInterface) {

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
        signIn,
        signUp
    }}>
        {children}
    </AuthContext.Provider>
}