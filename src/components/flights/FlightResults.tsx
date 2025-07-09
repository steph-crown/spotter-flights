import { SortMenu } from "@/components/filters";
import { FlightItinerary } from "@/components/flights/FlightItinerary";
import { BlockLoader } from "@/components/loaders";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import type {
  IFlightItinerary,
  IFlightSearchResponse,
  SortByOption,
} from "@/interfaces/flight.interface";
import { selectSortBy, setSortBy } from "@/store/slices/flightSearch.slice";
import { Box, Typography, useMediaQuery } from "@mui/material";
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
  const currentSort = useAppSelector(selectSortBy);
  const dispatch = useAppDispatch();

  const handleSortChange = (sortBy: SortByOption) => {
    dispatch(setSortBy(sortBy));
  };

  if (isLoading) {
    return <BlockLoader message="Loading flights ..." />;
  }

  if (!results?.data?.itineraries?.length) {
    return (
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Typography
          variant="body1"
          fontWeight={600}
          fontSize={20}
          sx={{ mb: 1 }}
        >
          No options matching your search
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Try changing your dates or destination to see results
        </Typography>
      </Box>
    );
  }

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

        <SortMenu
          currentSort={currentSort}
          onSortChange={handleSortChange}
          isSmallMobile={isSmallMobile}
        />
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
