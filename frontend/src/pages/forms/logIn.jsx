import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../utils/functions';
import styles from './form.module.css';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(event) {
        console.log('handle submit log in');
        event.preventDefault();

        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        if (response.ok) {
            login(data, navigate);
            // localStorage.setItem('token', data.token);
            // navigate('/home');
            console.log('Log in successful_2:', data);
        } else {
            console.log('Log in failed:', data);
        }
    }

    return (
        <main className={styles.page}>
            <h1>Log In</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div>
                    {/* <label htmlFor="email">Email</label> */}
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="email@example.com"
                        required
                    />
                </div>

                <div>
                    {/* <label htmlFor="password">Password</label> */}
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                <button type="submit">Log In</button>
            </form>
        </main>
    );
};

export default LogIn;
