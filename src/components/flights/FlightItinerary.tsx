import { ExpandedFlightDetails } from "@/components/flights/ExpandedFlightDetails";
import { FlightArrow } from "@/components/flights/FlightArrow";
import { FlightLogo } from "@/components/flights/FlightLogo";
import { StopInfo } from "@/components/flights/FlightStopInfo";
import { ELLIPSIS_SX } from "@/constants/style.constants";
import {
  MOBILE_BREAKPOINT_MAX_WIDTH,
  MOBILE_BREAKPOINT_MIN_WIDTH,
} from "@/constants/ui.constants";
import type { IFlightItinerary } from "@/interfaces/flight.interface";
import { analyzeFlightStops } from "@/utils/flight.utils";
import { formatDuration, formatPrice, formatTime } from "@/utils/format.utils";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  type TypographyVariant,
} from "@mui/material";
import { useState } from "react";

type FlightItineraryProps = {
  itinerary: IFlightItinerary;
  isFirst: boolean;
  isLast: boolean;
};

export function FlightItinerary({
  itinerary,
  isFirst,
  isLast,
}: FlightItineraryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isDesktop = useMediaQuery(MOBILE_BREAKPOINT_MIN_WIDTH);
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT_MAX_WIDTH);
  const isSmallMobile = useMediaQuery("(max-width:475px)");

  const flightLeg = itinerary.legs?.[0];
  const { stops, totalStopMinutes } = analyzeFlightStops(flightLeg);
  const carrier = flightLeg?.carriers?.marketing?.[0];

  const secondaryTextSx = {
    variant: "body2" as TypographyVariant,
    color: "text.secondary",
    sx: { fontSize: "0.75rem" },
  };

  // Container styles
  const containerSx = {
    cursor: "pointer",
    py: isSmallMobile ? 1.25 : 2,
    px: isSmallMobile ? 1.5 : 3,
    pr: isSmallMobile ? 1.5 : 10,
    border: "1px solid",
    borderColor: "text.primaryChannel",
    borderBottomWidth: (isLast || isSmallMobile) && !isExpanded ? "1" : "0",
    borderTopLeftRadius:
      isFirst || isSmallMobile || (isExpanded && !isSmallMobile)
        ? "0.5rem"
        : "",
    borderTopRightRadius:
      isFirst || isSmallMobile || (isExpanded && !isSmallMobile)
        ? "0.5rem"
        : "",
    borderBottomLeftRadius:
      (isLast || isSmallMobile) && !isExpanded ? "0.5rem" : "",
    borderBottomRightRadius:
      (isLast || isSmallMobile) && !isExpanded ? "0.5rem" : "",
    position: "relative",
    transition: "all 0.3s ease",
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Reusable components
  const TimeText = ({
    time,
    weight = 600,
  }: {
    time: string;
    weight?: number;
  }) => (
    <Typography variant="body1" fontWeight={weight}>
      {formatTime(time)}
    </Typography>
  );

  const SecondaryText = ({ children }: { children: React.ReactNode }) => (
    <Typography {...secondaryTextSx}>{children}</Typography>
  );

  const InfoDot = () => <Typography>·</Typography>;

  // Mobile grid layout
  const MobileGrid = () => (
    <Box width={180} flex={1} sx={{ flexShrink: 0 }}>
      <Box
        display="grid"
        gridTemplateColumns="repeat(3, fit-content(100px))"
        gridTemplateRows="repeat(2, 1fr)"
        justifyContent="start"
        columnGap={1}
        alignItems="center"
      >
        <TimeText time={flightLeg.departure} />
        <FlightArrow />
        <TimeText time={flightLeg.arrival} />
        <SecondaryText>{flightLeg?.origin.displayCode}</SecondaryText>
        <Box />
        <SecondaryText>{flightLeg?.destination.displayCode}</SecondaryText>
      </Box>

      {!isSmallMobile && (
        <Box display="flex" alignItems="center" gap={1}>
          <SecondaryText>
            {flightLeg.stopCount
              ? `${flightLeg.stopCount} Stop${
                  flightLeg.stopCount > 1 ? "s" : ""
                }`
              : "Non-Stop"}
          </SecondaryText>
          <InfoDot />
          <SecondaryText>
            {formatDuration(flightLeg.durationInMinutes)}
          </SecondaryText>
          <InfoDot />
          <SecondaryText>{carrier?.name}</SecondaryText>
        </Box>
      )}
    </Box>
  );

  // Desktop layout sections
  const TimeSection = () => (
    <Box
      minWidth={180}
      mr={1}
      sx={{ flex: isDesktop ? "0 0 calc(35% - 32px)" : "" }}
    >
      <Typography variant="body1" fontWeight={600}>
        {formatTime(flightLeg.departure)} - {formatTime(flightLeg.arrival)}
      </Typography>
      <SecondaryText>{carrier?.name}</SecondaryText>
    </Box>
  );

  const DurationSection = () => (
    <Box
      minWidth={0}
      sx={{
        flex: isDesktop ? "4" : "",
        whiteSpace: "nowrap",
        maxWidth: "180px",
      }}
    >
      <Typography variant="body1" fontWeight={500} sx={ELLIPSIS_SX}>
        {formatDuration(flightLeg.durationInMinutes)}
      </Typography>
      <SecondaryText>
        {flightLeg?.origin.displayCode}-{flightLeg?.destination.displayCode}
      </SecondaryText>
    </Box>
  );

  const StopsSection = () => (
    <Box
      minWidth={0}
      sx={{
        flex: isDesktop ? "4" : "",
        whiteSpace: "nowrap",
        maxWidth: "180px",
        minWidth: isMobile ? 130 : undefined,
      }}
    >
      <StopInfo flightLeg={flightLeg} />
      {totalStopMinutes && (
        <SecondaryText>
          {stops.length <= 1 && (
            <span>{formatDuration(totalStopMinutes)} </span>
          )}

          {stops.map((stop, index) => (
            <span key={stop.id}>
              {stop.id}
              {index !== stops.length - 1 && ", "}
            </span>
          ))}
        </SecondaryText>
      )}
    </Box>
  );

  // Small mobile additional info
  const SmallMobileInfo = () => (
    <Box display="flex" mt={0.5} alignItems="center" minWidth={0}>
      <FlightLogo size={32} carrier={carrier} />
      <Box>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          minWidth={0}
        >
          <SecondaryText>
            {flightLeg.stopCount
              ? `${flightLeg.stopCount} Stop${
                  flightLeg.stopCount > 1 ? "s" : ""
                } in ${stops.map((stop) => stop.id).join(", ")}`
              : "Non-Stop"}
          </SecondaryText>
          <InfoDot />
          <Typography
            variant="body2"
            sx={{ fontSize: "0.75rem", ...ELLIPSIS_SX }}
          >
            {formatDuration(flightLeg.durationInMinutes)}
          </Typography>
        </Box>
        <SecondaryText>{carrier?.name}</SecondaryText>
      </Box>
    </Box>
  );

  return (
    <Box key={itinerary.id}>
      <Box sx={containerSx}>
        <Box
          sx={{
            display: "flex",
            alignItems: isSmallMobile ? "flex-start" : "center",
            width: "100%",
          }}
        >
          {!isSmallMobile && (
            <FlightLogo size={isMobile ? 26 : 35} carrier={carrier} />
          )}

          {isMobile ? (
            <MobileGrid />
          ) : (
            <>
              <TimeSection />
              <DurationSection />
              <StopsSection />
            </>
          )}

          <Typography
            variant="body1"
            sx={{ fontWeight: "600", color: "success.main" }}
          >
            {formatPrice(itinerary.price.raw)}
          </Typography>

          {!isSmallMobile && (
            <IconButton
              onClick={handleToggleExpand}
              sx={{
                position: "absolute",
                right: 20,
                top: "50%",
                transform: `translateY(-50%) rotate(${
                  isExpanded ? 180 : 0
                }deg)`,
                transition: "transform 0.3s ease",
              }}
            >
              <ExpandMoreOutlinedIcon />
            </IconButton>
          )}
        </Box>

        {isSmallMobile && <SmallMobileInfo />}
      </Box>

      {/* Expanded details section */}
      <ExpandedFlightDetails flightLeg={flightLeg} isExpanded={isExpanded} />
    </Box>
  );
}
