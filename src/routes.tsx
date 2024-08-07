import { createBrowserRouter } from "react-router-dom"

import { Dashboard } from "./Pages/App/dashboard/dashbord"
import { SignIn } from "./Pages/Auth/signIn"
import { AppLayout } from "./Pages/_layout/app"
import { AuthLayout } from "./Pages/_layout/auth"
import { SignUp } from "./Pages/Auth/signUp"
import { Orders } from "./Pages/App/orders/Orders"
import { NotFound } from "./Pages/404"

export const router = createBrowserRouter([
    
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <NotFound/>,
        children: [
            { path: '/', element: <Dashboard /> },
            { path: '/orders', element: <Orders /> }
        ]
    },

    {
        path: '/',
        element: <AuthLayout />,
        children: [
            { path: '/sign-in', element: <SignIn /> },
            { path: '/sign-up', element: <SignUp/> }
        ]
    }
])

//o children sera o <Outlet /> que temos na pasta layout, dentro dos arquivos 