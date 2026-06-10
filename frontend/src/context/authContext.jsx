import { createContext, useEffect, useState } from 'react';
// import { getToken } from '../utils/functions';
import { fetchUserFromApi } from '../utils/userApi';
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function loadUser() {
        try {
            const data = await fetchUserFromApi();
            setUser(data);
        } catch (err) {
            console.error(err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }
    async function login(token) {
        localStorage.setItem('token', token);
        await loadUser();
        console.log('logged in authContext');
    }

    function logout() {
        localStorage.removeItem('token');
        setUser(null);
    }

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loadUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
