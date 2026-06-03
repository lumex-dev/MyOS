// App.jsx ist dagegen deine eigentliche Anwendung und enthält die Benutzeroberfläche.
import { useEffect, useState } from 'react';
import Navbar from './components/navbar/navBar';
import { Outlet } from 'react-router-dom';
import Footer from './components/footer/footer';
import styles from './index.module.css';
// import { isLoggedIn } from './utils/functions';

function App() {
    const currentTheme = localStorage.getItem('currentTheme');
    const [theme, setTheme] = useState(currentTheme ? currentTheme : 'light');
    useEffect(() => {
        localStorage.setItem('currentTheme', theme);
    }, [theme]);

    // const [isLoggedInState, setIsLoggedInState] = useState(() => isLoggedIn());

    return (
        <div className={`${styles.appLayout} ${theme === 'dark' ? styles.appLayoutDark : ''}`}>
            <Navbar
                theme={theme}
                setTheme={setTheme}
                // isLoggedInState={isLoggedInState}
                // setIsLoggedInState={setIsLoggedInState}
            />
            <main className={styles.mainContent}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default App;
