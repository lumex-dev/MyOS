import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './form.module.css';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();

        if (response.ok) {
            console.log('Sign up successful:', data);
            navigate('/login');
        } else {
            console.log('Sign up failed:', data);
        }
    }

    return (
        <main className={styles.page}>
            <h1>Create Account</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div>
                    {/* <label htmlFor="name">Name</label> */}
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Name"
                        required
                    />
                </div>

                <div>
                    {/* <label htmlFor="email">Email</label> */}
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="name@example.com"
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

                <button type="submit">Create Account</button>
            </form>
        </main>
    );
};

export default SignUp;
