import App from "./App";
import ErrorPage from "./ErrorPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    }
]

export default routes;