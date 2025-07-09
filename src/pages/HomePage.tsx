import DarkHeroIllustration from "@/assets/dark-hero-illustration.svg?react";
import LightHeroIllustration from "@/assets/light-hero-illustration.svg?react";
import { FilterBar } from "@/components/filters/FilterBar";
import HomepageFooter from "@/components/HomePageFooter";
import { MOBILE_BREAKPOINT_MAX_WIDTH } from "@/constants/ui.constants";
import {
  Box,
  Container,
  Typography,
  useColorScheme,
  useMediaQuery,
} from "@mui/material";
import React, { useMemo } from "react";

const HomePage: React.FC = () => {
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT_MAX_WIDTH);
  const { mode } = useColorScheme();

  const HeroIllustration = useMemo(
    () => (mode === "light" ? LightHeroIllustration : DarkHeroIllustration),
    [mode]
  );

  const containerSx = useMemo(
    () => ({
      "&.MuiContainer-root": {
        maxWidth: "960px",
      },
    }),
    []
  );

  const illustrationProps = useMemo(
    () => ({
      style: { width: "100%", height: "max-content" },
    }),
    []
  );

  const titleVariant = useMemo(() => (isMobile ? "h4" : "h3"), [isMobile]);
  const titleMarginTop = useMemo(() => (isMobile ? -2 : -4.5), [isMobile]);

  return (
    <Box>
      <Container maxWidth="lg">
        <HeroIllustration {...illustrationProps} />
      </Container>

      <Container sx={containerSx}>
        <Typography
          variant={titleVariant}
          fontWeight={500}
          textAlign="center"
          mt={titleMarginTop}
          mb={5}
        >
          Flights
        </Typography>

        <FilterBar />
      </Container>

      <HomepageFooter />
    </Box>
  );
};

export default HomePage;
