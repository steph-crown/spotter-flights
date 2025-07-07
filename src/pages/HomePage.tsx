import DarkHeroIllustration from "@/assets/dark-hero-illustration.svg?react";
import LightHeroIllustration from "@/assets/light-hero-illustration.svg?react";
import { FilterBar } from "@/components/filters/FilterBar";
import {
  Container,
  Typography,
  useColorScheme,
  useMediaQuery,
} from "@mui/material";
import React from "react";

const HomePage: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { mode } = useColorScheme();

  return (
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
  );
};

export default HomePage;
