/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { spotterBrand } from "@/theme";
import { ArrowBack, LocationOn } from "@mui/icons-material";
import {
  Box,
  Chip,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  TextField,
  Typography,
  useMediaQuery,
  CircularProgress,
  type PaperProps,
} from "@mui/material";
import { useSearchAirportsQuery } from "@/services/flight.service";
import { convertAirportToLocation } from "@/utils/location.utils";
import type { ILocation } from "@/interfaces/flight.interface";
import {
  MOBILE_BREAKPOINT_MAX_WIDTH,
  SMALLER_MOBILE_BREAKPOINT_MAX_WIDTH,
} from "@/constants/ui.constants";

interface LocationSelectorProps {
  value: ILocation | null;
  onChange: (location: ILocation | null) => void;
  placeholder: string;
  icon: React.ReactNode;
  ariaLabel?: string;
}

const SEARCH_DEBOUNCE_MS = 300;
const MIN_SEARCH_LENGTH = 2;
const FOCUS_DELAY_MS = 100;

export const LocationSelector = React.memo<LocationSelectorProps>(
  ({ value, onChange, placeholder, icon, ariaLabel = "Select location" }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const open = Boolean(anchorEl);
    const isMobile = useMediaQuery(MOBILE_BREAKPOINT_MAX_WIDTH);
    const isSmallerMobile = useMediaQuery(SMALLER_MOBILE_BREAKPOINT_MAX_WIDTH);

    useEffect(() => {
      const timer = setTimeout(() => {
        if (inputRef.current && open) {
          inputRef.current?.focus();
        }
      }, FOCUS_DELAY_MS);
      return () => clearTimeout(timer);
    }, [open]);

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedQuery(searchQuery);
      }, SEARCH_DEBOUNCE_MS);
      return () => clearTimeout(timer);
    }, [searchQuery]);

    const shouldSearch = debouncedQuery.length >= MIN_SEARCH_LENGTH;

    const {
      data: searchResults,
      isLoading,
      error,
    } = useSearchAirportsQuery(
      { query: debouncedQuery },
      { skip: !shouldSearch }
    );

    const filteredAirports = useMemo(() => {
      if (!searchResults?.data) return [];
      return searchResults.data.map(convertAirportToLocation);
    }, [searchResults]);

    const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
      setAnchorEl(null);
      setSearchQuery("");
    }, []);

    const handleLocationSelect = useCallback(
      (location: ILocation) => {
        onChange(location);
        handleClose();
      },
      [onChange, handleClose]
    );

    const handleSearchChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
      },
      []
    );

    const getDisplayValue = useCallback(() => {
      return value?.city || "";
    }, [value]);

    const textFieldSx = useMemo(
      () => ({
        "& .MuiOutlinedInput-root": {
          paddingLeft: isSmallerMobile ? "0" : "1.5rem",
          cursor: "pointer",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          backgroundColor: "transparent",
          "&:hover": {
            borderColor: "text.secondary",
          },
          "&.Mui-focused": {
            borderColor: "primary.main",
          },
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "& .MuiInputBase-input": {
          fontSize: "1rem",
          fontWeight: "500",
          padding: isMobile ? "0.5rem 1rem" : "0.875rem 0.875rem",
          cursor: "pointer",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          minHeight: isMobile ? "2rem" : "",
          color: value ? "text.primary" : "text.secondary",
        },
      }),
      [isSmallerMobile, isMobile, value]
    );

    const popoverPaperProps:
      | Partial<
          PaperProps<React.ElementType<any, keyof React.JSX.IntrinsicElements>>
        >
      | undefined = useMemo(
      () => ({
        sx: isMobile
          ? {
              position: "fixed",
              top: "0 !important",
              left: "0 !important",
              right: 0,
              bottom: 0,
              maxWidth: "100vw !important",
              maxHeight: "100vh !important",
              width: "100vw",
              height: "100vh",
              borderRadius: 0,
              margin: 0,
            }
          : {
              mt: 1,
              minWidth: 400,
              maxWidth: 500,
              borderRadius: 1,
              boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
            },
      }),
      [isMobile]
    );

    const chipSx = useMemo(
      () => ({
        backgroundColor: spotterBrand.teal[100],
        color: "primary.main",
        fontSize: "0.75rem",
        fontWeight: "bold",
        height: isMobile ? 24 : 20,
      }),
      [isMobile]
    );

    const renderListContent = () => {
      if (isLoading && searchQuery.length >= MIN_SEARCH_LENGTH) {
        return (
          <ListItem>
            <ListItemIcon>
              <CircularProgress size={20} />
            </ListItemIcon>
            <ListItemText primary="Searching..." />
          </ListItem>
        );
      }

      if (error) {
        return (
          <ListItem>
            <ListItemIcon>
              <LocationOn sx={{ color: "error.main" }} />
            </ListItemIcon>
            <ListItemText
              primary="Error searching locations"
              secondary="Please try again"
            />
          </ListItem>
        );
      }

      if (
        searchQuery.length >= MIN_SEARCH_LENGTH &&
        !isLoading &&
        filteredAirports.length === 0
      ) {
        return (
          <ListItem>
            <ListItemIcon>
              <LocationOn sx={{ color: "text.secondary" }} />
            </ListItemIcon>
            <ListItemText
              primary="No locations found"
              secondary="Try a different search term"
              sx={{ minWidth: 36 }}
            />
          </ListItem>
        );
      }

      if (searchQuery.length < MIN_SEARCH_LENGTH) {
        return (
          <ListItem>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <LocationOn sx={{ color: "text.secondary" }} />
            </ListItemIcon>
            <ListItemText
              primary="Start typing to search"
              secondary={`Enter at least ${MIN_SEARCH_LENGTH} characters`}
              sx={{
                "& .MuiTypography-body2": {
                  fontSize: "0.75rem",
                },
              }}
            />
          </ListItem>
        );
      }

      return filteredAirports.map((airport) => (
        <ListItem
          key={airport.skyId || airport.code}
          onClick={() => handleLocationSelect(airport)}
          sx={{
            cursor: "pointer",
            py: 0,
            px: 2,
            "&:hover": {
              backgroundColor: "text.primaryChannel",
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <LocationOn sx={{ color: "text.secondary" }} />
          </ListItemIcon>

          <ListItemText
            primary={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{
                    fontSize: isMobile ? "1rem" : "0.875rem",
                    fontWeight: "medium",
                  }}
                >
                  {airport.city}
                </Typography>
                {airport.code && (
                  <Chip label={airport.code} size="small" sx={chipSx} />
                )}
              </Box>
            }
            secondary={
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontSize: "0.75rem",
                  mt: 0.5,
                }}
              >
                {airport.name}, {airport.country}
              </Typography>
            }
          />
        </ListItem>
      ));
    };

    return (
      <>
        <FormControl sx={{ flex: 1 }}>
          <TextField
            value={getDisplayValue()}
            placeholder={placeholder}
            onClick={handleClick}
            InputProps={{
              startAdornment: isSmallerMobile ? null : (
                <InputAdornment position="start">{icon}</InputAdornment>
              ),
            }}
            inputProps={{ "aria-label": ariaLabel }}
            sx={textFieldSx}
          />
        </FormControl>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          PaperProps={popoverPaperProps}
          slotProps={{
            backdrop: {
              sx: isMobile ? { backgroundColor: "transparent" } : undefined,
            },
          }}
        >
          <Box
            sx={
              isMobile
                ? {
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "background.paper",
                  }
                : {}
            }
          >
            {isMobile && (
              <Container
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  minHeight: "3.5rem",
                }}
              >
                <IconButton onClick={handleClose} sx={{ mr: 2, pl: 0 }}>
                  <ArrowBack />
                </IconButton>

                <TextField
                  fullWidth
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder={placeholder}
                  inputRef={inputRef}
                  variant="standard"
                  sx={{
                    "& .MuiInput-root::before": {
                      borderBottom: "0 !important",
                    },
                    "& .MuiInput-root::after": {
                      borderBottom: "0 !important",
                    },
                  }}
                />
              </Container>
            )}

            <Box
              sx={
                isMobile
                  ? { px: 0, flex: 1, display: "flex", flexDirection: "column" }
                  : { p: 0 }
              }
            >
              {!isMobile && (
                <TextField
                  fullWidth
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder={placeholder}
                  inputRef={inputRef}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        style={{ marginRight: 16 }}
                      >
                        {icon}
                      </InputAdornment>
                    ),
                    endAdornment: isLoading ? (
                      <InputAdornment position="end">
                        <CircularProgress size={20} />
                      </InputAdornment>
                    ) : null,
                  }}
                  variant="standard"
                  sx={{
                    "& .MuiInput-root": {
                      padding: "0.75rem 1rem",
                      fontSize: "0.875rem",
                      fontWeight: "medium",
                    },
                    "& .MuiInput-root::before": {
                      borderBottomColor: "text.disabled",
                    },
                    "& .MuiInput-root::after": {
                      borderBottomColor: "text.disabled",
                    },
                  }}
                />
              )}

              <List
                sx={{
                  maxHeight: isMobile ? "none" : 300,
                  overflow: "auto",
                  flex: isMobile ? 1 : "none",
                  px: 0,
                  "&.MuiList-root": {
                    paddingTop: "0.3125rem",
                    paddingBottom: "0.5rem",
                  },
                }}
              >
                {renderListContent()}
              </List>
            </Box>
          </Box>
        </Popover>
      </>
    );
  }
);

LocationSelector.displayName = "LocationSelector";
