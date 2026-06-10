import { getToken } from './functions';

export async function fetchUserFromApi() {
    const token = getToken();

    if (!token) {
        return null;
    }

    const response = await fetch('http://localhost:3000/me', {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        localStorage.removeItem('token');
        throw new Error('failed to fetch user');
    }

    const data = await response.json();
    return data;
}
