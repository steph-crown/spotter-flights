import React, { lazy, type LazyExoticComponent } from "react";
import type { RouteObject } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import ErrorBoundary from "@/components/ErrorBoundary";

// Lazy load components
const HomePage: LazyExoticComponent<React.FC> = lazy(
  () => import("../pages/HomePage")
);

const ExplorePage: LazyExoticComponent<React.FC> = lazy(
  () => import("../pages/ExplorePage")
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
        element: (
          <ErrorBoundary>
            <HomePage />
          </ErrorBoundary>
        ),
      },
      {
        path: "/explore",
        element: (
          <ErrorBoundary>
            <ExplorePage />
          </ErrorBoundary>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
