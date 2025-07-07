import React, { lazy, type LazyExoticComponent } from "react";
import type { RouteObject } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";

// Lazy load components
const HomePage: LazyExoticComponent<React.FC> = lazy(
  () => import("../pages/HomePage")
);

const NotFoundPage: LazyExoticComponent<React.FC> = lazy(
  () => import("../pages/NotFoundPage")
);

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
