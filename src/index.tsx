import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";

import HomePage from './home_page/HomePage';
import ErrorPage from './error_page/ErrorPage';
import RouteErrorPage from './error_page/RouteErrorPage';
import SignupPage from './signup_page/SignupPage';
import LoginPage from './login_page/LoginPage';
import ForumPage from './forum_page/ForumPage';
import PostPage from './post_page/PostPage';
import UserPage from './user_page/UserPage';
import SlsMemberPage from './sls_member_page/SlsMemberPage';
import AdminLoginPage from './admin_login_page/AdminLoginPage';
import AdminPage from './admin_page/AdminPage';
import AdminErrorPage from './error_page/AdminErrorPage';

// 定义多页面的路由
const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
        errorElement: <RouteErrorPage/>,
    },
    {
        path: "/signup",
        element: <SignupPage/>,
    },
    {
        path: "/login",
        element: <LoginPage/>,
    },
    {
        path: "/error",
        element: <ErrorPage/>,
    },
    {
        path: "/forum",
        element: <ForumPage/>,
    },
    {
        path: "/post/:post_id",
        element: <PostPage/>,
    },
    {
        path: "/user/:student_id",
        element: <UserPage/>,
    },
    {
        path: "/sls_member/:student_id",
        element: <SlsMemberPage/>,
    },
    {
        path: "/admin_login",
        element: <AdminLoginPage/>,
    },
    {
        path: "/admin/:tab",
        element: <AdminPage/>,
    },
    {
        path: "/admin_error",
        element: <AdminErrorPage/>,
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
