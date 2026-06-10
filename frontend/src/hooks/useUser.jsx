import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { fetchUserFromApi } from '../utils/userApi';

function useUser() {
    const { user, setUser, loading } = useContext(AuthContext);

    async function fetchUser() {
        const data = await fetchUserFromApi();
        setUser(data);
        return data;
    }

    return { user, loading, fetchUser };
}

export default useUser;
