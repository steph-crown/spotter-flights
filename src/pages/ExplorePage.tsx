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
import { formatDateForAPI } from "@/utils/format.utils";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo } from "react";

type SortOption = "best" | "price_high";

const ExplorePage: React.FC = () => {
  const flightSearch = useAppSelector(selectFlightSearch);
  const dispatch = useAppDispatch();

  const [
    searchFlights,
    { data: flightResults, isLoading, isFetching, isError },
  ] = useLazySearchFlightsQuery();

  const searchRequest = useMemo((): IFlightSearchRequest | null => {
    if (
      !flightSearch.origin ||
      !flightSearch.destination ||
      !flightSearch.departureDate
    ) {
      return null;
    }

    return {
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
  }, [flightSearch]);

  const performFlightSearch = useCallback(() => {
    if (searchRequest) {
      searchFlights(searchRequest);
    }
  }, [searchRequest, searchFlights]);

  useEffect(() => {
    if (searchRequest) {
      performFlightSearch();
    }
  }, [searchRequest, performFlightSearch]);

  const handleSortChange = useCallback(
    (sortOption: SortOption) => {
      dispatch(setSortBy(sortOption));
    },
    [dispatch]
  );

  const sortOptions = useMemo(
    () => [
      { key: "best" as const, label: "Best" },
      { key: "price_high" as const, label: "Most Expensive" },
    ],
    []
  );

  const baseSortCardSx = useMemo(
    () => ({
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
    }),
    []
  );

  const activeSortCardSx = useMemo(
    () => ({
      borderColor: "primary.main",
      background: spotterBrand.teal[75],
      borderBottomWidth: "0.25rem",
    }),
    []
  );

  const containerSx = useMemo(
    () => ({
      "&.MuiContainer-root": {
        maxWidth: "1024px",
      },
    }),
    []
  );

  const isLoadingOrFetching = isLoading || isFetching;

  return (
    <>
      <LoadingProgressBar isLoading={isLoadingOrFetching} />

      <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
        <Container sx={{ py: 2, pt: 4, ...containerSx }}>
          <FilterBar hideSearchButton={true} />
        </Container>

        <Container sx={containerSx}>
          <Box>
            <Box sx={{ display: "flex", mb: 2 }}>
              {sortOptions.map((option, index) => (
                <Box
                  key={option.key}
                  sx={{
                    ...baseSortCardSx,
                    borderTopRightRadius: index === 0 ? 0 : 8,
                    borderBottomRightRadius: index === 0 ? 0 : 8,
                    borderTopLeftRadius: index === 1 ? 0 : 8,
                    borderBottomLeftRadius: index === 1 ? 0 : 8,
                    ...(flightSearch.sortBy === option.key
                      ? activeSortCardSx
                      : {}),
                  }}
                  onClick={() => handleSortChange(option.key)}
                >
                  <Typography
                    variant="body1"
                    color="primary"
                    sx={{ fontWeight: "medium" }}
                  >
                    {option.label}
                  </Typography>
                </Box>
              ))}
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
