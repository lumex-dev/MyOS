import App from './App.jsx';
import SignUp from './pages/forms/signUp.jsx';
import LogIn from './pages/forms/logIn.jsx';
import Home from './pages/private/home.jsx';
import StartPage from './pages/public/startPage.jsx';
import About from './pages/public/about.jsx';
import Profile from './pages/private/profile.jsx';
import ErrorPage from './pages/public/errorPage.jsx';

const routes = [
    {
        path: '/',
        element: <App />,
        // error: <ErrorPage />,
        children: [
            {
                index: true,
                element: <StartPage />,
            },
            {
                path: '/signup',
                element: <SignUp />,
            },
            {
                path: '/login',
                element: <LogIn />,
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/home',
                element: <Home />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
        ],
    },
];

export default routes;
