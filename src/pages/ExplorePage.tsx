import { FilterBar } from "@/components/filters/FilterBar";
import { FlightResults } from "@/components/flights/FlightResults";
import { useAppSelector } from "@/hooks/redux";
import type { IFlightSearchRequest } from "@/interfaces/flight.interface";
import { useLazySearchFlightsQuery } from "@/services/flight.service";
import { spotterBrand } from "@/theme";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ExplorePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSort, setActiveSort] = useState("price_high");
  const flightSearch = useAppSelector((state) => state.flightSearch);

  const [searchFlights, { data: flightResults, isLoading, isError }] =
    useLazySearchFlightsQuery();

  console.log({ flightResults });

  // Trigger search when component mounts or search params change
  useEffect(() => {
    const shouldSearch =
      flightSearch.origin &&
      flightSearch.destination &&
      flightSearch.departureDate;

    if (shouldSearch) {
      performFlightSearch();
    } else {
      // Redirect to home if required parameters are missing
      // navigate("/", { replace: true });
    }
  }, [flightSearch, navigate]);

  const performFlightSearch = () => {
    if (
      !flightSearch.origin ||
      !flightSearch.destination ||
      !flightSearch.departureDate
    ) {
      return;
    }

    const searchRequest: IFlightSearchRequest = {
      originSkyId: flightSearch.origin.skyId || flightSearch.origin.code,
      destinationSkyId:
        flightSearch.destination.skyId || flightSearch.destination.code,
      originEntityId: flightSearch.origin.entityId || flightSearch.origin.code,
      destinationEntityId:
        flightSearch.destination.entityId || flightSearch.destination.code,
      date: formatDateForAPI(new Date(flightSearch.departureDate)),
      returnDate: flightSearch.returnDate
        ? formatDateForAPI(new Date(flightSearch.returnDate))
        : undefined,
      cabinClass: flightSearch.classType,
      adults: flightSearch.passengers.adults,
      children: flightSearch.passengers.children,
      infants:
        flightSearch.passengers.infantsInSeat +
        flightSearch.passengers.infantsOnLap,
      sortBy: "best",
      limit: 50,
    };

    searchFlights(searchRequest);
  };

  const formatDateForAPI = (date: Date): string => {
    return date.toISOString().split("T")[0]; // YYYY-MM-DD format
  };

  const baseSortCardSx = {
    cursor: "pointer",
    flex: 1,
    px: 3,
    py: 1.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid",
    borderRadius: 2,
    borderColor: "text.primaryChannel",
  };

  const activeSortCardSx = {
    borderColor: "primary.main",

    background: spotterBrand.teal[75],
    borderBottomWidth: "0.25rem",
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <Container
        sx={{
          py: 2,
          pt: 4,
          "&.MuiContainer-root ": {
            maxWidth: "1024px",
          },
        }}
      >
        <FilterBar hideSearchButton={true} />
      </Container>

      {/* Desktop Content */}
      <Container
        sx={{
          "&.MuiContainer-root ": {
            maxWidth: "1024px",
          },
        }}
      >
        <Box>
          {/* {getSearchSummary()} */}

          {/* Sort Options */}
          <Box sx={{ display: "flex", mb: 2 }}>
            <Box
              sx={{
                ...baseSortCardSx,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                ...(activeSort === "best" ? activeSortCardSx : {}),
              }}
              onClick={() => {
                setActiveSort("best");
              }}
            >
              <Typography
                variant="body1"
                color="primary"
                sx={{ fontWeight: "medium" }}
              >
                Best
              </Typography>
            </Box>

            <Box
              component={Button}
              sx={{
                ...baseSortCardSx,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                ...(activeSort === "price_high" ? activeSortCardSx : {}),
                gap: 1,
              }}
              onClick={() => {
                setActiveSort("price_high");
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                Cheapest{" "}
              </Typography>
              {/* <Typography variant="caption" color="text.secondary">
                from NGN 2,958,026
              </Typography> */}
            </Box>
          </Box>

          {isLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {isError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Error searching for flights. Please try again.
            </Alert>
          )}

          {flightResults && (
            <FlightResults results={flightResults} isLoading={isLoading} />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default ExplorePage;
