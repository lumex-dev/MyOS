import { createContext, useEffect, useState } from 'react';
import { getToken } from '../utils/functions';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function loadUser() {
        const token = getToken();

        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }
        console.log('fetching profile data /me');
        const response = await fetch('http://localhost:3000/me', {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response);

        if (!response.ok) {
            localStorage.removeItem('token');
            setUser(null);
            setLoading(false);
            return;
        }

        const data = await response.json();
        console.log(data);

        setUser(data);
        setLoading(false);
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
