import styles from './navBar.module.css';
import { Link } from 'react-router-dom';

import logo_light from '../../assets/logo-black.png';
import logo_dark from '../../assets/logo-white.png';
// import search_icon_light from '../../assets/search-b.png';
// import search_icon_dark from '../../assets/search-w.png';
import toggle_light from '../../assets/night.png';
import toggle_dark from '../../assets/day.png';
import logIn_icon from '../../assets/login.svg';
import logOut_icon from '../../assets/logout.svg';
import { useNavigate } from 'react-router-dom';
import { logout, isLoggedIn } from '../../utils/functions';

const Navbar = ({ theme, setTheme }) => {
    const toggleMode = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    };
    const navigate = useNavigate();

    const loggedIn = isLoggedIn();

    return (
        <nav className={`${styles.navbar} ${theme === 'dark' ? styles.navbarDark : ''}`}>
            <img
                src={theme === 'light' ? logo_light : logo_dark}
                alt=""
                className={styles.logo}
                onClick={() => navigate('/home')}
            />
            <ul className={styles.navLinks}>
                <li className={styles.navItems}>
                    <Link to="/home">Home</Link>
                </li>
                <li className={styles.navItems}>
                    <Link to="/about">About</Link>
                </li>
            </ul>
            {/* <div className="searchBox">
                <input type="text" placeholder="search" />
                <img src={theme === 'light' ? search_icon_light : search_icon_dark} alt="" />
            </div> */}

            <img
                src={theme === 'light' ? toggle_light : toggle_dark}
                alt=""
                className={styles.toggleIcon}
                onClick={() => toggleMode()}
            />

            {loggedIn ? (
                <>
                    <Link to="/profile">
                        <button>Profile</button>
                    </Link>
                    <button onClick={() => logout(navigate)}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/signup">
                        <button>Sign up</button>
                    </Link>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </>
            )}

            <img
                src={loggedIn ? logOut_icon : logIn_icon}
                alt=""
                className={`${styles.loggingIcon} ${theme === 'dark' ? styles.loggingIconDark : ''}`}
                onClick={() => {
                    if (loggedIn) {
                        logout(navigate);
                        // localStorage.removeItem('token');
                        // navigate('/login');
                    } else {
                        navigate('/login');
                    }
                }}
            />
        </nav>
    );
};

export default Navbar;
