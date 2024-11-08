import ErrorPage from "./ErrorPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Homepage from "./Homepage";
import Menu from "./Menu.jsx"
import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext.js';
import Dashboard from "./Dashboard.jsx";
import BankAccounts from "./BankAccounts.jsx"
import MachineLearning from "./MachineLearning.jsx";
import TimeMachine from "./TimeMachine.jsx";
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
    },
    {
        path:"/dashboard",
        element: <Dashboard />
    },
    {
        path:"/ml",
        element: <MachineLearning />
    },
    {
        path:"/bankaccounts",
        element: <BankAccounts/>
    },
    {
        path:"/timemachine",
        element: <TimeMachine/>
    }
]

export default routes;