import App from './App.jsx';
import SignUp from './pages/signUp.jsx';
import LogIn from './pages/logIn.jsx';
import Home from './pages/home.jsx';

const routes = [
    {
        path: '/',
        element: <App />,
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
        path: '/home',
        element: <Home />,
    },
];

export default routes;
