import { createBrowserRouter } from "react-router-dom";
import Login from "components/auth/Login";
import Register from "components/auth/Register";
import Layout from "components/layout";

export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const PROTECTED = "/protected";
export const DASHBOARD = "/protected/dashboard"; //only users that are signed can see it

//HAVING THIS ALLOWS ME TO CHANGE THE ROUTE NAME WITHOUT HAVING TO GO CHANGE IT IN THE ACTUAL FILE
export const router = createBrowserRouter([
  { path: ROOT, element: "Public Root" },
  { path: LOGIN, element: <Login /> },
  { path: REGISTER, element: <Register /> }, //LINE 35 IN LOGIN
  {
    path: PROTECTED,
    element: <Layout />,
    children: [
      {
        path: DASHBOARD,
        element: "Dashboard",
      },
    ],
  },
]);
