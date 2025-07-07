import {
  CombinedDateSelector,
  FilterSelect,
  LocationSelector,
  PassengerSelector,
  type Location,
  type PassengerCounts,
} from "@/components/filters";
import { CLASS_OPTIONS, TRIP_OPTIONS } from "@/constants/filter.constants";
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
import { useState } from "react";

export function FilterBar() {
  const [origin, setOrigin] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);

  const isMobile = useMediaQuery("(max-width:600px)");
  const { mode } = useColorScheme();
  const [tripType, setTripType] = useState("round_trip");
  const [classType, setClassType] = useState("economy");
  const [passengers, setPassengers] = useState<PassengerCounts>({
    adults: 1,
    children: 2,
    infantsInSeat: 0,
    infantsOnLap: 0,
  });

  const paperDesktopSx = {
    padding: "1rem",
    paddingBottom: "3rem",
    borderRadius: "0.5rem",
    position: "relative",
    boxShadow:
      mode === "light"
        ? "0 1px 3px 0 rgba(60,64,67,.3),0 4px 8px 3px rgba(60,64,67,.15)"
        : "0 1px 3px 0 rgba(0,0,0,.3),0 4px 8px 3px rgba(0,0,0,.15)",
  };

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

  const handleTripTypeChange = (event: SelectChangeEvent) => {
    setTripType(event.target.value);
  };

  const handleClassTypeChange = (event: SelectChangeEvent) => {
    setClassType(event.target.value);
  };

  const handlePassengerChange = (newPassengers: PassengerCounts) => {
    setPassengers(newPassengers);
  };

  const handleOriginChange = (location: Location | null) => {
    setOrigin(location);
  };

  const handleDestinationChange = (location: Location | null) => {
    setDestination(location);
  };

  const handleDepartureDateChange = (date: Date | null) => {
    setDepartureDate(date);
  };

  const handleReturnDateChange = (date: Date | null) => {
    setReturnDate(date);
  };

  const swapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <Paper
      elevation={isMobile ? 0 : 3}
      sx={{
        "&.MuiPaper-elevation": isMobile ? paperMobileSx : paperDesktopSx,
      }}
    >
      <Stack spacing={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <FilterSelect
            value={tripType}
            onChange={handleTripTypeChange}
            options={TRIP_OPTIONS}
            icon={<SwapHoriz sx={{ color: "text.secondary" }} />}
            ariaLabel="Select trip type"
          />
          <PassengerSelector
            value={passengers}
            onChange={handlePassengerChange}
            ariaLabel="Select passengers"
          />
          <FilterSelect
            value={classType}
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
          <Box display={"flex"} alignItems={"center"}>
            <LocationSelector
              value={origin}
              onChange={handleOriginChange}
              placeholder="From"
              icon={<FlightTakeoff sx={{ color: "text.secondary" }} />}
              ariaLabel="Select origin"
            />

            <IconButton onClick={swapLocations}>
              <SwapHoriz sx={{ color: "text.secondary" }} />
            </IconButton>

            <LocationSelector
              value={destination}
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
            tripType={tripType}
            ariaLabel="Select dates"
          />
        </Box>

        <Button
          variant="contained"
          size="large"
          startIcon={<Search />}
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
          Explore
        </Button>
        {/* </Box> */}
      </Stack>
    </Paper>
  );
}
