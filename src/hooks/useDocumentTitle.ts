import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PageTitles {
  [key: string]: string;
}

const pageTitles: PageTitles = {
  "/": "Home - Spotter Flights",
  "/search": "Search Flights - Spotter Flights",
  "/results": "Flight Results - Spotter Flights",
};

export const useDocumentTitle = (): void => {
  const location = useLocation();

  useEffect(() => {
    const title = pageTitles[location.pathname] || "Spotter Flights";
    document.title = title;
  }, [location.pathname]);
};
