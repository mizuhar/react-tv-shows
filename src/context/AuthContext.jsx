import { useNavigate } from "react-router-dom";
import { createContext } from "react";
import { useMemo } from "react";


import { login,register,logout } from "../data/auth";

import usePersistedState from "../hooks/usePersisted";
import { AUTH_KEY } from "../constants/authConstants";




export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const [auth, setAuth] = usePersistedState(AUTH_KEY, null);

    const loginSubmitHandler = async ({email,password}) => {
        try {
            const result = await login(email,password);
            setAuth(result);
            navigate('/');
        } catch(err){
            console.error(err);
        }
    };

    const registerSubmitHandler = async ({email,password}) => {
        try {
            const result = await register(email,password);
            setAuth(result);
            navigate('/');
        } catch(err){
            console.error(err);
        }
    };

    const logoutHandler = async () => {
        try {
            await logout?.();
        } catch {}

        setAuth(null);
        navigate('/login');
    };

    const context = useMemo(() => ({
        loginSubmitHandler,
        registerSubmitHandler,
        logoutHandler,
        auth,
        userId: auth?._id,
        username: auth?.username || auth?.email,
        email: auth?.email,
        isAuthenticated: !!auth,
    }), [auth]);

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext
