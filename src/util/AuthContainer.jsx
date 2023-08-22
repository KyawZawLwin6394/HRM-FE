import {
    Navigate,
    Outlet
} from "react-router-dom";


const AuthContainer = () => {
    const token = localStorage.getItem('token')
    let isAuthenticated;
    token ? isAuthenticated = true : isAuthenticated = false
    return (
        isAuthenticated ? <Outlet /> : <Navigate to='/' />
    );
};

export default AuthContainer;