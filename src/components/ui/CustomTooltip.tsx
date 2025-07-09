import { Tooltip, type TooltipProps } from "@mui/material";
import { cloneElement, type ReactElement } from "react";

interface CustomTooltipProps extends Omit<TooltipProps, "children"> {
  children: ReactElement;
}

export const CustomTooltip = ({
  children,
  title,
  ...props
}: CustomTooltipProps) => {
  if (!title) {
    return children;
  }

  return (
    <Tooltip
      title={title}
      arrow
      placement="top"
      enterTouchDelay={0}
      leaveTouchDelay={3000}
      sx={{
        "& .MuiTooltip-tooltip": {
          fontSize: "0.75rem",
          maxWidth: "300px",
        },
      }}
      {...props}
    >
      {cloneElement(children)}
    </Tooltip>
  );
};
