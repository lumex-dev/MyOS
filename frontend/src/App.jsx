import './App.css';
import { Link } from 'react-router-dom';

function App() {
    return (
        <main>
            <h1>Template App</h1>

            <Link to="/login">
                <button>Login</button>
            </Link>

            <Link to="/signup">
                <button>Sign up</button>
            </Link>
        </main>
    );
}

export default App;
