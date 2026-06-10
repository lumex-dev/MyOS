import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './form.module.css';
import { useAuth } from '../../hooks/useAuth';

const SignUp = () => {
    //functions
    const { signup } = useAuth();
    //data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //status
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');
        setIsLoading(true);
        setSuccess('');

        try {
            const data = await signup(name, email, password);

            setSuccess(true); // setSuccess(data.message || 'Account created successfully. You can now log in.');
            setName('');
            setEmail('');
            setPassword('');
            setTimeout(() => {
                navigate('/login');
            }, 3000);

            console.log('Sign up successful:', data);
        } catch (err) {
            console.log(err.message);
            setError('server not reachable' + err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className={styles.page}>
            <h1>Create Account</h1>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
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
                        placeholder="Email"
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
                        placeholder="Password"
                        required
                    />
                </div>

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating account...' : 'Create Account'}
                </button>
            </form>
        </main>
    );
};

export default SignUp;
