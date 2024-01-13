import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import EmployeesList from "../pages/EmployeesList/EmployeesList";
import AddEmployee from "../pages/AddEmployee/AddEmployee";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

export const routes = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:'/',
                element:<EmployeesList></EmployeesList>,
            },
            {
                path:'/employees-list',
                element:<EmployeesList></EmployeesList>,
            },
            {
                path:'/add-employee',
                element:<AddEmployee></AddEmployee>,
            } 
        ]
    }
])