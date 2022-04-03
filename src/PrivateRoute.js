import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import Login from './components/Login';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useAuth();
    return currentUser ? <Outlet /> :
    <Navigate to="login" />
}

export default PrivateRoute