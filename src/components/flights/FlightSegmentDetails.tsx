import type {
  IFlightSegment,
  IFlightStop,
} from "@/interfaces/flight.interface";
import { CustomTooltip } from "@/components/ui/CustomTooltip";
import {
  formatDuration,
  formatTime,
  formatFullDateTime,
  formatStopTooltip,
} from "@/utils/format.utils";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { Box, Chip, Typography } from "@mui/material";

type FlightSegmentDetailsProps = {
  stops: IFlightStop[];
  segment: IFlightSegment;
  isLast: boolean;
  totalStopMinutes?: number;
};

export function FlightSegmentDetails({
  segment,
  stops,
  totalStopMinutes,
  isLast: isLastSegment,
}: FlightSegmentDetailsProps) {
  return (
    <Box sx={{ py: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FlightTakeoffIcon
            sx={{ fontSize: "1rem", color: "text.secondary" }}
          />
          <CustomTooltip title={formatFullDateTime(segment.departure)}>
            <Typography
              variant="body2"
              fontWeight="medium"
              sx={{ cursor: "help" }}
            >
              {formatTime(segment.departure)}
            </Typography>
          </CustomTooltip>
          <Typography variant="body2" color="text.secondary">
            {segment.origin.displayCode}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            height: "1px",
            background:
              "linear-gradient(to right, currentColor 0%, currentColor 50%, transparent 50%)",
            backgroundSize: "8px 1px",
            color: "text.secondary",
            opacity: 0.5,
          }}
        />

        <Chip
          label={segment.flightNumber}
          size="small"
          variant="outlined"
          sx={{
            fontSize: "0.75rem",
            fontWeight: "medium",
          }}
        />

        <Box
          sx={{
            flex: 1,
            height: "1px",
            background:
              "linear-gradient(to right, transparent 50%, currentColor 50%, currentColor 100%)",
            backgroundSize: "8px 1px",
            color: "text.secondary",
            opacity: 0.5,
          }}
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {segment.destination.displayCode}
          </Typography>
          <CustomTooltip title={formatFullDateTime(segment.arrival)}>
            <Typography
              variant="body2"
              fontWeight="medium"
              sx={{ cursor: "help" }}
            >
              {formatTime(segment.arrival)}
            </Typography>
          </CustomTooltip>
          <FlightLandIcon sx={{ fontSize: "1rem", color: "text.secondary" }} />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="body2" color="text.secondary">
            {segment.origin.name} → {segment.destination.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.75rem" }}
          >
            <CustomTooltip title={segment.marketingCarrier.name}>
              <span style={{ cursor: "help" }}>
                {segment.marketingCarrier.name}
              </span>
            </CustomTooltip>
            {" • "}
            {formatDuration(segment.durationInMinutes)}
          </Typography>
        </Box>

        <Box sx={{ textAlign: "right" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.75rem" }}
          >
            Aircraft: {segment.marketingCarrier.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.75rem" }}
          >
            Operated by {segment.operatingCarrier.name}
          </Typography>
        </Box>
      </Box>

      {!isLastSegment && (
        <Box
          sx={{ mt: 2, pt: 2, borderTop: "1px dashed", borderColor: "divider" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.75rem" }}
            >
              Layover •{" "}
              {stops.find(
                (stop) => segment.destination.displayCode === stop.id
              ) ? (
                <>
                  {formatDuration(totalStopMinutes || 0)} in{" "}
                  <CustomTooltip
                    title={formatStopTooltip(
                      stops.find(
                        (stop) => segment.destination.displayCode === stop.id
                      )!
                    )}
                  >
                    <span
                      style={{
                        textDecoration: "underline dotted",
                        cursor: "help",
                      }}
                    >
                      {segment.destination.displayCode}
                    </span>
                  </CustomTooltip>
                </>
              ) : (
                "Connection time varies"
              )}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
