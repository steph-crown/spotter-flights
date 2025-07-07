import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
import { routes } from "./routes";

const router = createBrowserRouter(routes);

const AppRouter: React.FC = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default AppRouter;
