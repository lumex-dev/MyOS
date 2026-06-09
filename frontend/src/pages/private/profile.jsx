import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

function Profile() {
    const { user } = useContext(AuthContext);

    return (
        <main>
            <h1>Profile of, {user?.name || user?.email || 'user'}</h1>
        </main>
    );
}

export default Profile;
