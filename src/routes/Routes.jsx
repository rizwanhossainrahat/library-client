import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import MainLayout from "../mainlayout/MainLayout";
import ErrrorPage from "../pages/ErrrorPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";

import AddBooks from "../pages/Dashboard/author/AddBooks";
import AddedBooklist from "../pages/Dashboard/author/AddedBooklist";

import ShowBookings from './../pages/Dashboard/reader/ShowBookings';

import AuthorRoutes from "./AuthorRoutes";
import ReaderRoutes from "./ReaderRoutes"
import PrivateRoute from "./PrivateRoute";


export const router=createBrowserRouter([
    {
        path:'/',
        element:<MainLayout></MainLayout>,
        errorElement:<ErrrorPage></ErrrorPage>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
           {
            path:'/about',
            element:<About></About>
           },
           {
            path:'/login',
            element:<Login></Login>
           },
           {
            path:'/register',
            element:<Register></Register>
           },
           {
            path:'/about',
            element:<About></About>
           },
           {
            path:'/dashboard',
            element:<Dashboard></Dashboard>,
            children:[
                //author path 
                {
                    index:true,
                    element:<PrivateRoute><AuthorRoutes><AddBooks></AddBooks></AuthorRoutes></PrivateRoute>
                },

                // my book list path for specific host
                {
                    path:'added-books',
                    element:<PrivateRoute><AuthorRoutes><AddedBooklist></AddedBooklist></AuthorRoutes></PrivateRoute>,
                }, 
                //reader  path
                {
                    path:'show-bookings',
                    element:<PrivateRoute><ReaderRoutes><ShowBookings></ShowBookings></ReaderRoutes></PrivateRoute>
                }, 
            ]
           }
        ],
      
    },
    
   
])