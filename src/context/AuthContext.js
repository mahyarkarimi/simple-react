import React, { useContext, useCallback, useState, useEffect, useMemo } from 'react';
import { sleep } from '../util';

const AuthContext = React.createContext({
    user: {},
    signin: async (username, password, cb) => Boolean,
    signout: null,
    isAuthenticated: Boolean,
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState({ username: ''});

    useEffect(() => {
        if(localStorage.username) {
            setUser({ username: localStorage.username})
        }
    }, []);
    const isAuthenticated = useMemo(() => {
        return user && user.username;
    }, [user]);


    const signin = async (username, password, cb = null) => {
        await sleep(2000);
        if (password === 'admin') {
            localStorage.setItem('username', username);
            setUser({ username: username });
            if (cb != null) cb();
            await sleep(1000)
            return true;
        }
        return false;
    };

    const signout = () => {
        window.localStorage.clear();
        window.location.href = '/';
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                signin,
                signout,
                isAuthenticated,
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthConsumer = AuthContext.Consumer;
export default AuthContext;



