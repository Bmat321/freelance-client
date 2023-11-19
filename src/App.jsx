import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import {
  Outlet,
  RouterProvider,
  ScrollRestoration,
  createBrowserRouter,
} from "react-router-dom";
import "./app.scss";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Add from "./pages/add/Add";
import Gig from "./pages/gig/Gig";
import Gigs from "./pages/gigs/Gigs";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Message from "./pages/message/Message";
import Messages from "./pages/messages/Messages";
import MyGigs from "./pages/myGigs/MyGigs";
import Orders from "./pages/orders/Orders";
import Pay from "./pages/pay/Pay";
import Register from "./pages/register/Register";
import Success from "./pages/success/Success";

const queryClient = new QueryClient();

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="main">
        <Navbar />
        <div className="">
          <ScrollRestoration />
          <Outlet />
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/gig/:id",
          element: <Gig />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/mygigs",
          element: <MyGigs />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/pay/:id",
      element: <Pay />,
    },
    {
      path: "/success",
      element: <Success />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
