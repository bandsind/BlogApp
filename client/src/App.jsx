import React from "react";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Single from "./pages/Single"
import Write from "./pages/Write"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./style.scss";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";

const Layout = () => {
  return(
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

// Define the router with route configuration
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout/>,  // The common layout wrapper for child routes
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/post/:id",
          element:<Single/>
        },
        {
          path:"/write",
          element:<Write/>
        },
      ]
    },
    {
      path:"/register",
      element:<Register/>
    },
    {
      path:"/login",
      element:<Login/>
    },
  
  ]
);

// App component is the root of the application
const App = () => {
  return (
    <div className="app">
      <div className="container">
      <RouterProvider router={router} />
      </div>
    </div>
  );
};
export default App;