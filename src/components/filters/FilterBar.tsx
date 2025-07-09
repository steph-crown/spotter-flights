import {
  CombinedDateSelector,
  FilterSelect,
  LocationSelector,
  PassengerSelector,
} from "@/components/filters";
import { CLASS_OPTIONS, TRIP_OPTIONS } from "@/constants/filter.constants";
import { MOBILE_BREAKPOINT_MAX_WIDTH } from "@/constants/ui.constants";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useUrlSync } from "@/hooks/useUrlSync";
import type {
  ClassType,
  ILocation,
  IPassengerCounts,
  TripType,
} from "@/interfaces/flight.interface";
import {
  setClassType,
  setDepartureDate,
  setDestination,
  setOrigin,
  setPassengers,
  setReturnDate,
  setSearching,
  setTripType,
  swapLocations,
} from "@/store/slices/flightSearch.slice";
import {
  FlightLand,
  FlightTakeoff,
  Search,
  SwapHoriz,
} from "@mui/icons-material";
import type { SelectChangeEvent } from "@mui/material";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  useColorScheme,
  useMediaQuery,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

interface FilterBarProps {
  hideSearchButton?: boolean;
}

export function FilterBar({ hideSearchButton = false }: FilterBarProps) {
  const dispatch = useAppDispatch();
  const flightSearch = useAppSelector((state) => state.flightSearch);
  const { updateUrlFromState } = useUrlSync();
  const navigate = useNavigate();
  const [showIncompleteFilterPrompt, setShowIncompleteFilterPrompt] =
    useState(false);

  const isMobile = useMediaQuery(MOBILE_BREAKPOINT_MAX_WIDTH);
  const { mode } = useColorScheme();

  const shadowStyles = useMemo(
    () => ({
      light: "0 1px 3px 0 rgba(60,64,67,.3),0 4px 8px 3px rgba(60,64,67,.15)",
      dark: "0 1px 3px 0 rgba(0,0,0,.3),0 4px 8px 3px rgba(0,0,0,.15)",
    }),
    []
  );

  const paperDesktopSx = useMemo(() => {
    if (hideSearchButton) return {};

    return {
      position: "relative",
      padding: "1rem",
      paddingBottom: "3rem",
      borderRadius: "0.5rem",
      boxShadow: mode === "light" ? shadowStyles.light : shadowStyles.dark,
    };
  }, [hideSearchButton, mode, shadowStyles]);

  const paperMobileSx = useMemo(
    () => ({
      padding: "0rem",
      paddingBottom: "2rem",
      borderRadius: "1rem",
      position: "relative",
      backgroundColor: mode === "dark" ? "grey.900" : "background.paper",
      marginLeft: "-1rem",
      marginRight: "-1rem",
      paddingLeft: "1rem",
      paddingRight: "1rem",
      boxShadow:
        mode === "light"
          ? "0 2px 2px 0 rgba(60,64,67,.3),0 2px 6px -6px rgba(60,64,67,.15)"
          : "0 2px 2px 0 rgba(0,0,0,.3),0 2px 6px -6px rgba(0,0,0,.15)",
    }),
    [mode]
  );

  const searchDependencies = useMemo(
    () => [
      flightSearch.tripType,
      flightSearch.classType,
      flightSearch.passengers,
      flightSearch.origin,
      flightSearch.destination,
      flightSearch.departureDate,
      flightSearch.returnDate,
      flightSearch.sortBy,
    ],
    [flightSearch]
  );

  useEffect(() => {
    updateUrlFromState();
  }, [searchDependencies, updateUrlFromState]);

  const handleTripTypeChange = useCallback(
    (event: SelectChangeEvent) => {
      dispatch(setTripType(event.target.value as TripType));
    },
    [dispatch]
  );

  const handleClassTypeChange = useCallback(
    (event: SelectChangeEvent) => {
      dispatch(setClassType(event.target.value as ClassType));
    },
    [dispatch]
  );

  const handlePassengerChange = useCallback(
    (newPassengers: IPassengerCounts) => {
      dispatch(setPassengers(newPassengers));
    },
    [dispatch]
  );

  const handleOriginChange = useCallback(
    (location: ILocation | null) => {
      dispatch(setOrigin(location));
    },
    [dispatch]
  );

  const handleDestinationChange = useCallback(
    (location: ILocation | null) => {
      dispatch(setDestination(location));
    },
    [dispatch]
  );

  const handleDepartureDateChange = useCallback(
    (date: Date | null) => {
      dispatch(setDepartureDate(date ? date.toISOString() : null));
    },
    [dispatch]
  );

  const handleReturnDateChange = useCallback(
    (date: Date | null) => {
      dispatch(setReturnDate(date ? date.toISOString() : null));
    },
    [dispatch]
  );

  const handleSwapLocations = useCallback(() => {
    dispatch(swapLocations());
  }, [dispatch]);

  const canProceedToExplore = useMemo(() => {
    return (
      flightSearch.tripType &&
      flightSearch.passengers &&
      flightSearch.classType &&
      flightSearch.origin &&
      flightSearch.destination &&
      flightSearch.departureDate
    );
  }, [
    flightSearch.classType,
    flightSearch.departureDate,
    flightSearch.destination,
    flightSearch.origin,
    flightSearch.passengers,
    flightSearch.tripType,
  ]);

  const handleSearch = useCallback(() => {
    if (!canProceedToExplore) {
      setShowIncompleteFilterPrompt(true);
      return;
    }

    dispatch(setSearching(true));
    navigate("/explore");

    const timer = setTimeout(() => {
      dispatch(setSearching(false));
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch, navigate, canProceedToExplore]);

  const dateValues = useMemo(
    () => ({
      departureDate: flightSearch.departureDate
        ? new Date(flightSearch.departureDate)
        : null,
      returnDate: flightSearch.returnDate
        ? new Date(flightSearch.returnDate)
        : null,
    }),
    [flightSearch.departureDate, flightSearch.returnDate]
  );

  const locationBoxSx = useMemo(
    () => ({
      display: "flex",
      alignItems: "center",
      sx: {
        width: isMobile ? "100%" : "fit-content",
        maxWidth: !isMobile ? "65%" : "unset",
      },
    }),
    [isMobile]
  );

  const searchButtonSx = useMemo(
    () => ({
      px: 2.25,
      py: 1,
      fontSize: "0.875rem",
      fontWeight: "medium",
      textTransform: "none",
      position: "absolute",
      bottom: "-1.25rem",
      left: "50%",
      transform: "translateX(-50%)",
    }),
    []
  );

  return (
    <Paper
      elevation={hideSearchButton || isMobile ? 0 : 3}
      sx={{
        "&.MuiPaper-elevation": isMobile ? paperMobileSx : paperDesktopSx,
      }}
    >
      <Stack spacing={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <FilterSelect
            value={flightSearch.tripType}
            onChange={handleTripTypeChange}
            options={TRIP_OPTIONS}
            icon={<SwapHoriz sx={{ color: "text.secondary" }} />}
            ariaLabel="Select trip type"
          />
          <PassengerSelector
            value={flightSearch.passengers}
            onChange={handlePassengerChange}
            ariaLabel="Select passengers"
          />
          <FilterSelect
            value={flightSearch.classType}
            onChange={handleClassTypeChange}
            options={CLASS_OPTIONS}
            icon={null}
            ariaLabel="Select class type"
          />
        </Box>

        <Box
          display="flex"
          alignItems="center"
          columnGap={2}
          rowGap={1.5}
          flexDirection={isMobile ? "column" : "row"}
        >
          <Box {...locationBoxSx}>
            <LocationSelector
              value={flightSearch.origin}
              onChange={handleOriginChange}
              placeholder="Where from?"
              icon={<FlightTakeoff sx={{ color: "text.secondary" }} />}
              ariaLabel="Select origin"
            />

            <IconButton
              onClick={handleSwapLocations}
              aria-label="Swap locations"
            >
              <SwapHoriz sx={{ color: "text.secondary" }} />
            </IconButton>

            <LocationSelector
              value={flightSearch.destination}
              onChange={handleDestinationChange}
              placeholder="Where to?"
              icon={<FlightLand sx={{ color: "text.secondary" }} />}
              ariaLabel="Select destination"
            />
          </Box>

          <CombinedDateSelector
            departureDate={dateValues.departureDate}
            returnDate={dateValues.returnDate}
            onDepartureDateChange={handleDepartureDateChange}
            onReturnDateChange={handleReturnDateChange}
            tripType={flightSearch.tripType}
            ariaLabel="Select dates"
          />
        </Box>

        {!hideSearchButton && (
          <Button
            variant="contained"
            size="large"
            startIcon={<Search />}
            onClick={handleSearch}
            disabled={flightSearch.isSearching}
            sx={searchButtonSx}
          >
            {flightSearch.isSearching ? "Searching..." : "Explore"}
          </Button>
        )}
      </Stack>

      <Snackbar
        open={showIncompleteFilterPrompt}
        autoHideDuration={6000}
        onClose={() => {
          setShowIncompleteFilterPrompt(false);
        }}
        message="Select the details of your flight to explore"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </Paper>
  );
}
