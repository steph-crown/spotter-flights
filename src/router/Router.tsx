import { useLocaleInitialization } from "@/hooks/useLocaleInitialization";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";

const router = createBrowserRouter(routes);

const AppRouter: React.FC = () => {
  useLocaleInitialization();

  return <RouterProvider router={router} />;
};

export default AppRouter;
