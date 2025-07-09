import { Logo } from "@/components/Logo";
import { MOBILE_BREAKPOINT_MAX_WIDTH } from "@/constants/ui.constants";
import {
  CheckCircle,
  Facebook,
  FlightTakeoff,
  Instagram,
  LinkedIn,
  Luggage,
  Twitter,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  IconButton,
  Link,
  Typography,
  useMediaQuery,
} from "@mui/material";

const HomepageFooter = () => {
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT_MAX_WIDTH);

  const travelTips = [
    {
      icon: (
        <FlightTakeoff sx={{ fontSize: "1.5rem", color: "text.secondary" }} />
      ),
      title: "Travel Requirements",
      description: "Check visa and passport requirements before you fly.",
    },
    {
      icon: <Luggage sx={{ fontSize: "1.5rem", color: "text.secondary" }} />,
      title: "Baggage Guide",
      description: "Learn about baggage allowances and restrictions.",
    },
    {
      icon: (
        <CheckCircle sx={{ fontSize: "1.5rem", color: "text.secondary" }} />
      ),
      title: "Online Check-in",
      description: "Save time at the airport with mobile check-in.",
    },
  ];

  const socialLinks = [
    { icon: <Twitter />, url: "#", label: "Twitter" },
    { icon: <Facebook />, url: "#", label: "Facebook" },
    { icon: <Instagram />, url: "#", label: "Instagram" },
    { icon: <LinkedIn />, url: "#", label: "LinkedIn" },
  ];

  const footerLinks = {
    Company: ["About Us", "Careers", "Press", "Blog"],
    Support: ["Help Center", "Contact Us", "Travel Alerts", "Feedback"],
    Legal: [
      "Privacy Policy",
      "Terms of Service",
      "Cookie Policy",
      "Accessibility",
    ],
  };

  return (
    <Box
      sx={{
        mt: 8,
        bgcolor: "background.default",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box sx={{ bgcolor: "grey.50" }}>
        <Container
          sx={{
            py: 8,
            "&.MuiContainer-root": {
              maxWidth: "1024px",
            },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              fontWeight: 600,
              mb: 4,
            }}
          >
            Travel Tips & Resources
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            {travelTips.map((tip, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  p: 2,
                  borderRadius: 1,
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                  "&:hover": {
                    bgcolor: "background.paper",
                  },
                }}
              >
                <Box sx={{ mt: 0.5 }}>{tip.icon}</Box>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {tip.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: "0.75rem" }}
                  >
                    {tip.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <Box
        sx={{
          bgcolor: "background.paper",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container
          sx={{
            py: 6,
            "&.MuiContainer-root": {
              maxWidth: "1024px",
            },
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "2fr 1fr 1fr 1fr",
              },
              gap: 4,
            }}
          >
            <Box>
              <Box sx={{ mb: 3 }}>
                <Logo />

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "0.75rem", mb: 2 }}
                >
                  Your trusted partner for finding the best flight deals
                  worldwide. Compare prices from hundreds of airlines and travel
                  agencies.
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 1 }}>
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    size="small"
                    sx={{
                      color: "text.secondary",
                      "&:hover": {
                        color: "primary.main",
                        bgcolor: "primary.main",
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>

            {Object.entries(footerLinks).map(([category, links]) => (
              <Box key={category}>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
                  {category}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {links.map((link, index) => (
                    <Link
                      key={index}
                      href="#"
                      color="text.secondary"
                      underline="none"
                      sx={{
                        fontSize: "0.75rem",
                        transition: "color 0.2s ease",
                        "&:hover": {
                          color: "primary.main",
                        },
                      }}
                    >
                      {link}
                    </Link>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.75rem" }}
            >
              © 2025 Spotter Flights. All rights reserved.
            </Typography>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "0.75rem" }}
              >
                Trusted by 1M+ travelers
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "0.75rem" }}
              >
                500+ Airlines
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomepageFooter;
