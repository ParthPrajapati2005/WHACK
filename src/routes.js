import ErrorPage from "./ErrorPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Homepage from "./Homepage";
import Menu from "./Menu.jsx"
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
        element: <Menu />
    }
]

export default routes;