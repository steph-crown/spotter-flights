import { FlightItinerary } from "@/components/flights/FlightItinerary";
import type {
  IFlightItinerary,
  IFlightSearchResponse,
} from "@/interfaces/flight.interface";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { Box, Button, Paper, Typography, useMediaQuery } from "@mui/material";
import React from "react";

interface FlightResultsProps {
  results: IFlightSearchResponse;
  isLoading: boolean;
}

export const FlightResults: React.FC<FlightResultsProps> = ({
  results,
  isLoading,
}) => {
  const isSmallMobile = useMediaQuery("(max-width:475px)");

  if (isLoading) {
    return <Typography>Loading flights...</Typography>;
  }

  if (!results?.data?.itineraries?.length) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          No flights found
        </Typography>
        <Typography color="text.secondary">
          Try adjusting your search criteria
        </Typography>
      </Paper>
    );
  }

  console.log({ results });

  return (
    <Box pb={8}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        mb={isSmallMobile ? 1.5 : 2}
        alignItems={"flex-end"}
      >
        <Box>
          <Typography variant="h6" fontWeight={600}>
            Top Flights
          </Typography>
        </Box>

        <Button
          variant="text"
          color="primary"
          sx={{ paddingRight: 2, paddingLeft: 2 }}
          size="small"
        >
          {!isSmallMobile && <>Sorted by</>} Price <SwapVertIcon />
        </Button>
      </Box>

      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={isSmallMobile ? 1 : undefined}
      >
        {results.data.itineraries.map((itinerary: IFlightItinerary, index) => (
          <FlightItinerary
            itinerary={itinerary}
            key={itinerary.id}
            isFirst={index === 0}
            isLast={index === results.data.itineraries?.length - 1}
          />
        ))}
      </Box>
    </Box>
  );
};
