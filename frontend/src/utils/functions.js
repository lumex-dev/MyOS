export function getToken() {
    return localStorage.getItem('token');
}

export function login(data, navigate) {
    console.log('Log in successful_1:', data);
    localStorage.setItem('token', data.token);
    navigate('/home');
    // setIsLoggedInState(true);
    console.log('logged in');
}

export function isLoggedIn() {
    return !!localStorage.getItem('token');
}

export function logout(navigate) {
    localStorage.removeItem('token');
    // setIsLoggedIn2(false);
    navigate('/login');
    // setIsLoggedInState(false);
    console.log('logged out');
}
