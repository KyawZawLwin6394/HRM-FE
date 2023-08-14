import {
    Navigate,
    Outlet
} from "react-router-dom";
import PropTypes from 'prop-types';


const AuthContainer = () => {
    const token = localStorage.getItem('token')
    let isAuthenticated;
    token ? isAuthenticated = true : isAuthenticated = false
    return (
        isAuthenticated ? <Outlet /> : <Navigate to='/' />
    );
};

AuthContainer.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
};

export default AuthContainer;