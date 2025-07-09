import { Box } from "@mui/material";
import { keyframes } from "@mui/system";

interface LoadingProgressBarProps {
  isLoading: boolean;
}

const indeterminateAnimation = keyframes`
  0% {
    left: -35%;
    right: 100%;
  }
  60% {
    left: 100%;
    right: -90%;
  }
  100% {
    left: 100%;
    right: -90%;
  }
`;

const indeterminateAnimationShort = keyframes`
  0% {
    left: -200%;
    right: 100%;
  }
  60% {
    left: 107%;
    right: -8%;
  }
  100% {
    left: 107%;
    right: -8%;
  }
`;

export const LoadingProgressBar: React.FC<LoadingProgressBarProps> = ({
  isLoading,
}) => {
  if (!isLoading) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1304,
        height: "0.3125rem",
        overflow: "hidden",
        backgroundColor: "transparent",
      }}
    >
      <Box
        sx={{
          height: "100%",
          position: "relative",
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          "&::before": {
            content: '""',
            position: "absolute",
            height: "100%",
            backgroundColor: "primary.main",
            animation: `${indeterminateAnimation} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite`,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            height: "100%",
            backgroundColor: "primary.main",
            animation: `${indeterminateAnimationShort} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite`,
            animationDelay: "1.15s",
          },
        }}
      />
    </Box>
  );
};
