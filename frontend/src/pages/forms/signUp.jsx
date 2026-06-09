import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './form.module.css';

const SignUp = () => {
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
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'sign up failed');
                return;
            }

            console.log('Sign up successful:', data);
            // navigate('/login');
            setSuccess(data.message || 'Account created successfully. You can now log in.');
            setName('');
            setEmail('');
            setPassword('');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            console.log(err);
            setError('server not reachable' + err);
        } finally {
            setIsLoading(false);
        }

        // if (response.ok) {
        //     console.log('Sign up successful:', data);
        //     navigate('/login');
        // } else {
        //     // setError(data);
        //     // console.log('Sign up failed:', data);
        // }
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
