// import css
import './Profile.css';
import { useContext } from 'react';
import AuthContext from './AuthContext';
import { Button } from 'react-bootstrap';

import AppNavbar from './AppNavbar';
const Profile = () => {
    const authContext = useContext(AuthContext);
    return (
        <>
            <AppNavbar />
            <div className='box1'>
            </div>

            <div className='box2'>
            </div>
            <div className='home-container'>
                {authContext.isLoggedIn && (
                    <Button variant="danger" onClick={authContext.onLogout}>
                        Logout
                    </Button>
                )}
            </div>
        </>
    );
}

export default Profile;
