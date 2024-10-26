import ErrorPage from "./ErrorPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Homepage from "./Homepage";
import Menu from "./Menu.jsx"
import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext.js';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? children : <Navigate to="/login" />;
};

const routes = [
    {
        path: "/",
        element: <Homepage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path:"/menu",
        element: (
            <ProtectedRoute>
                <Menu/>
            </ProtectedRoute>
        )
    }
]

export default routes;