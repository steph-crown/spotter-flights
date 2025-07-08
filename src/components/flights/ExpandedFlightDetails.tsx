import { FlightSegmentDetails } from "@/components/flights/FlightSegmentDetails";
import type { IFlightLeg } from "@/interfaces/flight.interface";
import { analyzeFlightStops, getSegmentLayover } from "@/utils/flight.utils";
import { formatDuration } from "@/utils/format.utils";
import { Box, Button, Collapse, Divider, Typography } from "@mui/material";

type ExpandedFlightDetailsProps = {
  flightLeg: IFlightLeg;
  isExpanded: boolean;
};

export function ExpandedFlightDetails({
  flightLeg,
  isExpanded,
}: ExpandedFlightDetailsProps) {
  const { stops } = analyzeFlightStops(flightLeg);

  return (
    <Collapse in={isExpanded} timeout={300}>
      <Box
        sx={{
          px: 2,
          py: 2,
          border: "1px solid",
          mb: 1,
          borderColor: "divider",
          backgroundColor: "background.default",
          borderBottomLeftRadius: "0.5rem",
          borderBottomRightRadius: "0.5rem",
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: "medium", fontSize: "1rem" }}
        >
          Flight Details
        </Typography>

        {/* Flight segments */}
        <Box>
          {flightLeg?.segments?.map((segment, index) => {
            const layoverMinutes = getSegmentLayover(flightLeg.segments, index);

            return (
              <FlightSegmentDetails
                key={segment.id}
                stops={stops}
                segment={segment}
                isLast={index === flightLeg.segments.length - 1}
                totalStopMinutes={layoverMinutes}
              />
            );
          })}
        </Box>

        {/* Additional flight info */}
        <Divider sx={{ my: 2 }} />

        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "0.75rem" }}
              >
                Total Duration
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {formatDuration(flightLeg.durationInMinutes)}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "0.75rem" }}
              >
                Stops
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {flightLeg.stopCount
                  ? `${flightLeg.stopCount} stop${
                      flightLeg.stopCount > 1 ? "s" : ""
                    }`
                  : "Non-stop"}
              </Typography>
            </Box>

            {flightLeg.stopCount > 0 && (
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "0.75rem" }}
                >
                  Stop Locations
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {stops.map((stop) => stop.id).join(", ")}
                </Typography>
              </Box>
            )}

            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "0.75rem" }}
              >
                Aircraft
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {flightLeg.segments?.[0]?.marketingCarrier?.name || "Various"}
              </Typography>
            </Box>
          </Box>

          <Button variant="outlined" sx={{ py: 1 }}>
            Select flight
          </Button>
        </Box>
      </Box>
    </Collapse>
  );
}
