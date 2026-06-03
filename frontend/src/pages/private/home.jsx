import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, logout } from '../../utils/functions';

function Home() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadUser() {
            // const token = localStorage.getItem('token');
            const token = getToken();

            if (!token) {
                navigate('/');
                return;
            }

            const response = await fetch('http://localhost:3000/me', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                logout(navigate);
                // localStorage.removeItem('token');
                // navigate('/login');
                return;
            }
            const data = await response.json();
            setUser(data);
        }
        loadUser();
    }, [navigate]);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <main>
            <h1>Welcome, {user.name || user.email}</h1>

            {/* <button
                onClick={() => {
                    logout(navigate);
                    // localStorage.removeItem('token');
                    // navigate('/');
                }}
            >
                Logout
            </button> */}
        </main>
    );
}

export default Home;
