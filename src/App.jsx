import {createBrowserRouter, RouterProvider} from "react-router-dom";

import RootLayout from "./pages/Root.jsx";
import HomePage, {action as createTodoAction} from "./pages/Home.jsx";
import ErrorPage from "./pages/Error";
import AuthPage from "./pages/Auth";
import CalendarPage from "./pages/Calendar";

import './App.css'


const router = createBrowserRouter([
    {path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        id: 'root',
        children: [
            // {index: true, element: <HomePage />,},
            {index: true, element: <HomePage />, action: createTodoAction},
            {path: 'auth', element: <AuthPage />},
            {path: 'calendar', element: <CalendarPage />}
            // {path: 'logout', action: logoutAction},
        ]}
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App
