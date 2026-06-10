import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export function useAuth() {
    const { login } = useContext(AuthContext);

    async function signup(name, email, password) {
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Sign up failed');
        }
        await login(data.token); //was macht das?
        return data; //{ success: true };
    }

    async function loginUser(email, password) {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'login failed');
        }
        console.log('Log in successful_2:', data);

        await login(data.token);
        return data;
    }
    return { signup, loginUser };
}
