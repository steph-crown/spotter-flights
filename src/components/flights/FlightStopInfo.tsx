import { ELLIPSIS_SX } from "@/constants/style.constants";
import type { IFlightLeg } from "@/interfaces/flight.interface";
import { Typography } from "@mui/material";

type StopInfoProps = {
  flightLeg: IFlightLeg;
};

export function StopInfo({ flightLeg }: StopInfoProps) {
  const stopText = flightLeg.stopCount
    ? `${flightLeg.stopCount} Stop${flightLeg.stopCount > 1 ? "s" : ""}`
    : "Non-Stop";

  return (
    <Typography variant="body1" fontWeight={500} sx={ELLIPSIS_SX}>
      {stopText}
    </Typography>
  );
}
