import { Logo } from "@/components/Logo";
import { ModeToggle } from "@/components/ModeToggle";
import { spotterBrand } from "@/theme";
import { AppBar, Box, Container, Toolbar, useColorScheme } from "@mui/material";

export function Header() {
  const { mode } = useColorScheme();
  return (
    <Box>
      <AppBar
        position="static"
        color="default"
        sx={{
          "&.MuiAppBar-root": {
            background:
              mode === "light"
                ? spotterBrand.neutral.white
                : spotterBrand.neutral.black,
            borderWidth: "0",
            borderBottomWidth: "0.0625rem",
            boxShadow: "none",

            borderStyle: "solid",
            borderBottomColor: mode === "light" ? "#dadce0" : "#5f6368",
          },
        }}
      >
        <Toolbar
          sx={{
            "&.MuiToolbar-root": {
              paddingLeft: "0",
              paddingRight: "0",
            },
          }}
        >
          <Container maxWidth="xl">
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              width={"100%"}
            >
              <Logo />

              <Box>
                <ModeToggle />
              </Box>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
