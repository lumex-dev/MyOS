import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { login } from '../../utils/functions';
import styles from './form.module.css';
// import { AuthContext } from '../../context/authContext';
import { useAuth } from '../../hooks/useAuth';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // const { login } = useContext(AuthContext);
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(event) {
        console.log('handle submit log in');
        event.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const data = await loginUser(email, password);

            // await login(data.token);
            navigate('/home');
            console.log('Log in successful_2:', data);
        } catch (err) {
            setError('server not reachable' + err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className={styles.page}>
            <h1>Log In</h1>
            {error && <p className={styles.error}>{error}</p>}

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
                        placeholder="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Log in'}
                </button>
            </form>
        </main>
    );
};

export default LogIn;
