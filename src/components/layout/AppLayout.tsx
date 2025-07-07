import { Header } from "@/components/layout/Header";
import { BlockLoader } from "@/components/loaders";
import { Box } from "@mui/material";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

const AppLayout: React.FC = () => {
  useDocumentTitle();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <Box component="main">
        <Suspense fallback={<BlockLoader message="Loading page..." />}>
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  );
};

export default AppLayout;
