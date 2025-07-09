import { FilterBar } from "@/components/filters/FilterBar";
import { FlightResults } from "@/components/flights/FlightResults";
import { LoadingProgressBar } from "@/components/loaders";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import type { IFlightSearchRequest } from "@/interfaces/flight.interface";
import { useLazySearchFlightsQuery } from "@/services/flight.service";
import {
  selectFlightSearch,
  setSortBy,
} from "@/store/slices/flightSearch.slice";
import { spotterBrand } from "@/theme";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ExplorePage: React.FC = () => {
  const navigate = useNavigate();
  const flightSearch = useAppSelector(selectFlightSearch);
  const dispatch = useAppDispatch();

  const [
    searchFlights,
    { data: flightResults, isLoading, isFetching, isError },
  ] = useLazySearchFlightsQuery();

  const performFlightSearch = useCallback(() => {
    if (
      !flightSearch.origin ||
      !flightSearch.destination ||
      !flightSearch.departureDate
    ) {
      return;
    }

    console.log({ flightSearch });

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
      sortBy: flightSearch.sortBy,
      limit: 50,
      market: flightSearch.market,
      currency: flightSearch.currency,
      countryCode: flightSearch.countryCode,
    };

    searchFlights(searchRequest);
  }, [flightSearch, searchFlights]);

  // Trigger search when component mounts or search params change
  useEffect(() => {
    const shouldSearch =
      flightSearch.origin &&
      flightSearch.destination &&
      flightSearch.departureDate;

    if (shouldSearch) {
      performFlightSearch();
    }
  }, [flightSearch, navigate, performFlightSearch]);

  const formatDateForAPI = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  console.log({ fififir: isLoading, isFetching });

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
    <>
      <LoadingProgressBar isLoading={isLoading || isFetching} />

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
            <Box sx={{ display: "flex", mb: 2 }}>
              <Box
                sx={{
                  ...baseSortCardSx,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  ...(flightSearch.sortBy === "best" ? activeSortCardSx : {}),
                }}
                onClick={() => {
                  dispatch(setSortBy("best"));
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
                  ...(flightSearch.sortBy === "price_high"
                    ? activeSortCardSx
                    : {}),
                  gap: 1,
                }}
                onClick={() => {
                  dispatch(setSortBy("price_high"));
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                  Most Expensive{" "}
                </Typography>
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
    </>
  );
};

export default ExplorePage;
