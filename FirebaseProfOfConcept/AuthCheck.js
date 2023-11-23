import { useContext } from "react";
import { useLocation, userLocation } from 'react-router'
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../App";

const checkAuthContex = () =>
{
    const { userAuth } = useContext(UserContext);
    return userAuth && userAuth.isLoggedIn;
}

const AuthCheck = () =>
{
    const isFrom = useLocation();
    const isAuth = checkAuthContex();

    return ( isAuth ?
        <Outlet/>
        :
        <Navigate to="/" replace state={{ from:isFrom }}/>
    );

}

export default AuthCheck;