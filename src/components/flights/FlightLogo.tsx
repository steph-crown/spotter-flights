import { MOBILE_BREAKPOINT_MAX_WIDTH } from "@/constants/ui.constants";
import type { IFlightCarrierInfo } from "@/interfaces/flight.interface";
import { useMediaQuery } from "@mui/material";

type FlightLogoProps = {
  carrier: IFlightCarrierInfo;
  size: number;
};

export function FlightLogo({ size, carrier }: FlightLogoProps) {
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT_MAX_WIDTH);
  const isSmallMobile = useMediaQuery("(max-width:475px)");

  if (!carrier?.logoUrl) return null;

  return (
    <img
      src={carrier.logoUrl}
      alt={carrier.name}
      style={{
        width: size,
        height: size,
        marginRight:
          isSmallMobile && size === 32
            ? "0.5rem"
            : isMobile
            ? "1.375rem"
            : "2rem",
      }}
    />
  );
}
