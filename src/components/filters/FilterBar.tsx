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
  setLastSearchParams,
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
  Stack,
  useColorScheme,
  useMediaQuery,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface FilterBarProps {
  hideSearchButton?: boolean;
}

export function FilterBar({ hideSearchButton = false }: FilterBarProps) {
  const dispatch = useAppDispatch();
  const flightSearch = useAppSelector((state) => state.flightSearch);
  const { updateUrlFromState } = useUrlSync();
  const navigate = useNavigate();

  const isMobile = useMediaQuery(MOBILE_BREAKPOINT_MAX_WIDTH);
  const { mode } = useColorScheme();

  const paperDesktopShowSearchBarSx = {
    position: "relative",
    padding: "1rem",
    paddingBottom: "3rem",
    borderRadius: "0.5rem",
    boxShadow:
      mode === "light"
        ? "0 1px 3px 0 rgba(60,64,67,.3),0 4px 8px 3px rgba(60,64,67,.15)"
        : "0 1px 3px 0 rgba(0,0,0,.3),0 4px 8px 3px rgba(0,0,0,.15)",
  };

  const paperDesktopSx = hideSearchButton ? {} : paperDesktopShowSearchBarSx;

  const paperMobileSx = {
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
  };

  // Update URL whenever state changes
  useEffect(() => {
    updateUrlFromState();
  }, [
    flightSearch.tripType,
    flightSearch.classType,
    flightSearch.passengers,
    flightSearch.origin,
    flightSearch.destination,
    flightSearch.departureDate,
    flightSearch.returnDate,
    updateUrlFromState,
  ]);

  const handleTripTypeChange = (event: SelectChangeEvent) => {
    dispatch(setTripType(event.target.value as TripType));
  };

  const handleClassTypeChange = (event: SelectChangeEvent) => {
    dispatch(setClassType(event.target.value as ClassType));
  };

  const handlePassengerChange = (newPassengers: IPassengerCounts) => {
    dispatch(setPassengers(newPassengers));
  };

  const handleOriginChange = (location: ILocation | null) => {
    dispatch(setOrigin(location));
  };

  const handleDestinationChange = (location: ILocation | null) => {
    dispatch(setDestination(location));
  };

  const handleDepartureDateChange = (date: Date | null) => {
    dispatch(setDepartureDate(date ? date.toISOString() : null));
  };

  const handleReturnDateChange = (date: Date | null) => {
    dispatch(setReturnDate(date ? date.toISOString() : null));
  };

  const handleSwapLocations = () => {
    dispatch(swapLocations());
  };

  const handleSearch = () => {
    // Validate required fields
    // if (
    //   !flightSearch.origin ||
    //   !flightSearch.destination ||
    //   !flightSearch.departureDate
    // ) {
    //   // You can add toast notification here
    //   console.warn("Please fill in all required fields");
    //   return;
    // }

    // Set searching state and save search params
    dispatch(setSearching(true));
    dispatch(
      setLastSearchParams({
        tripType: flightSearch.tripType,
        classType: flightSearch.classType,
        passengers: flightSearch.passengers,
        origin: flightSearch.origin,
        destination: flightSearch.destination,
        departureDate: flightSearch.departureDate,
        returnDate: flightSearch.returnDate,
      })
    );

    // Here you would typically navigate to results page or trigger search
    // For now, we'll just log the search
    console.log("Searching with params:", flightSearch);

    navigate("/explore");

    // Reset searching state after a delay (simulate API call)
    setTimeout(() => {
      dispatch(setSearching(false));
    }, 1000);
  };

  // Convert state dates back to Date objects for components
  const departureDate = flightSearch.departureDate
    ? new Date(flightSearch.departureDate)
    : null;
  const returnDate = flightSearch.returnDate
    ? new Date(flightSearch.returnDate)
    : null;

  console.log({ hideSearchButton });

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
          <Box
            display={"flex"}
            alignItems={"center"}
            sx={{
              width: isMobile ? "100%" : "fit-content",
              maxWidth: !isMobile ? "65%" : "unset",
            }}
          >
            <LocationSelector
              value={flightSearch.origin}
              onChange={handleOriginChange}
              placeholder="From"
              icon={<FlightTakeoff sx={{ color: "text.secondary" }} />}
              ariaLabel="Select origin"
            />

            <IconButton onClick={handleSwapLocations}>
              <SwapHoriz sx={{ color: "text.secondary" }} />
            </IconButton>

            <LocationSelector
              value={flightSearch.destination}
              onChange={handleDestinationChange}
              placeholder="To"
              icon={<FlightLand sx={{ color: "text.secondary" }} />}
              ariaLabel="Select destination"
            />
          </Box>

          <CombinedDateSelector
            departureDate={departureDate}
            returnDate={returnDate}
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
            sx={{
              px: 2.25,
              py: 1,
              fontSize: "0.875rem",
              fontWeight: "medium",
              textTransform: "none",
              position: "absolute",
              bottom: "-1.25rem",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {flightSearch.isSearching ? "Searching..." : "Explore"}
          </Button>
        )}
      </Stack>
    </Paper>
  );
}
