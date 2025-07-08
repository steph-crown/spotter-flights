import DarkHeroIllustration from "@/assets/dark-hero-illustration.svg?react";
import LightHeroIllustration from "@/assets/light-hero-illustration.svg?react";
import { FilterBar } from "@/components/filters/FilterBar";
import { MOBILE_BREAKPOINT_MAX_WIDTH } from "@/constants/ui.constants";
import {
  Box,
  Container,
  Typography,
  useColorScheme,
  useMediaQuery,
} from "@mui/material";
import React from "react";

const HomePage: React.FC = () => {
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT_MAX_WIDTH);
  const { mode } = useColorScheme();

  return (
    <Box>
      <Container maxWidth="lg">
        {mode === "light" ? (
          <LightHeroIllustration
            style={{ width: "100%", height: "max-content" }}
          />
        ) : (
          <DarkHeroIllustration
            style={{ width: "100%", height: "max-content" }}
          />
        )}
      </Container>

      <Container
        sx={{
          "&.MuiContainer-root ": {
            maxWidth: "960px",
          },
        }}
      >
        <Typography
          variant={isMobile ? "h4" : "h3"}
          fontWeight={500}
          textAlign={"center"}
          mt={isMobile ? -2 : -4.5}
          mb={5}
        >
          Flights
        </Typography>

        <FilterBar />
      </Container>
    </Box>
  );
};

export default HomePage;
