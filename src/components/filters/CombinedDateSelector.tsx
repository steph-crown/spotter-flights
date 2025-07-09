import {
  MOBILE_BREAKPOINT_MAX_WIDTH,
  SMALLER_MOBILE_BREAKPOINT_MAX_WIDTH,
} from "@/constants/ui.constants";
import { CalendarToday } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputAdornment,
  Popover,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";

interface CombinedDateSelectorProps {
  departureDate: Date | null;
  returnDate: Date | null;
  onDepartureDateChange: (date: Date | null) => void;
  onReturnDateChange: (date: Date | null) => void;
  tripType: string;
  ariaLabel?: string;
}

export function CombinedDateSelector({
  departureDate,
  returnDate,
  onDepartureDateChange,
  onReturnDateChange,
  tripType,
  ariaLabel = "Select dates",
}: CombinedDateSelectorProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const isMobile = useMediaQuery(MOBILE_BREAKPOINT_MAX_WIDTH);
  const isSmallerMobile = useMediaQuery(SMALLER_MOBILE_BREAKPOINT_MAX_WIDTH);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getDisplayValue = () => {
    if (!departureDate && !returnDate) return "";

    if (tripType === "round_trip") {
      const departure = departureDate
        ? departureDate.toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
            month: "short",
          })
        : "Departure";

      const returnText = returnDate
        ? returnDate.toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
            month: "short",
          })
        : "Return";

      return isMobile
        ? `${departure} - ${returnText}`
        : `${departure} • ${returnText}`;
    } else {
      return departureDate
        ? departureDate.toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
            month: "short",
          })
        : "Departure";
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormControl sx={{ flex: 1, width: "100%" }}>
        <TextField
          value={getDisplayValue()}
          placeholder={
            tripType === "round_trip" ? "Departure • Return" : "Departure"
          }
          onClick={handleClick}
          InputProps={{
            startAdornment: isSmallerMobile ? null : (
              <InputAdornment position="start">
                <CalendarToday
                  sx={{
                    color: "text.secondary",
                  }}
                />
              </InputAdornment>
            ),
          }}
          inputProps={{ "aria-label": ariaLabel }}
          sx={{
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
                backgroundColor: "transparent",
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
              // color: value ? "text.primary" : "text.secondary",
              color: getDisplayValue() ? "text.primary" : "text.secondary",
            },
          }}
        />
      </FormControl>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: isMobile ? 320 : 600,
            borderRadius: 2,
            boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          {tripType === "round_trip" ? (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Box
                    display="flex"
                    alignItems={"center"}
                    justifyContent={
                      departureDate ? "space-between" : "flex-start"
                    }
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 1, color: "text.secondary" }}
                    >
                      Departure
                    </Typography>

                    {departureDate ? (
                      <Button
                        variant="text"
                        sx={{
                          pr: 0,
                          pl: 0,
                          py: 0,
                          minWidth: "unset",
                          "&:hover": {
                            background: "transparent",
                            boxShadow: "none",
                          },
                        }}
                        onClick={() => {
                          onDepartureDateChange(null);
                        }}
                      >
                        Clear
                      </Button>
                    ) : null}
                  </Box>

                  <DatePicker
                    value={departureDate}
                    onChange={onDepartureDateChange}
                    minDate={new Date()}
                    sx={{ width: "100%" }}
                  />
                </Box>

                <Divider
                  orientation={isMobile ? "horizontal" : "vertical"}
                  flexItem
                />

                <Box sx={{ flex: 1 }}>
                  <Box
                    display="flex"
                    alignItems={"center"}
                    justifyContent={returnDate ? "space-between" : "flex-start"}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 1, color: "text.secondary" }}
                    >
                      Return
                    </Typography>

                    {returnDate ? (
                      <Button
                        variant="text"
                        sx={{
                          pr: 0,
                          pl: 0,
                          py: 0,
                          minWidth: "unset",
                          "&:hover": {
                            background: "transparent",
                            boxShadow: "none",
                          },
                        }}
                        onClick={() => {
                          onReturnDateChange(null);
                        }}
                      >
                        Clear
                      </Button>
                    ) : null}
                  </Box>

                  <DatePicker
                    value={returnDate}
                    onChange={onReturnDateChange}
                    minDate={departureDate || new Date()}
                    sx={{ width: "100%" }}
                  />
                </Box>
              </Box>
            </Box>
          ) : (
            <Box sx={{ flex: 1 }}>
              <Box
                display="flex"
                alignItems={"center"}
                justifyContent={departureDate ? "space-between" : "flex-start"}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, color: "text.secondary" }}
                >
                  Departure
                </Typography>

                {departureDate ? (
                  <Button
                    variant="text"
                    sx={{
                      pr: 0,
                      pl: 0,
                      py: 0,
                      minWidth: "unset",
                      "&:hover": {
                        background: "transparent",
                        boxShadow: "none",
                      },
                    }}
                    onClick={() => {
                      onDepartureDateChange(null);
                    }}
                  >
                    Clear
                  </Button>
                ) : null}
              </Box>

              <DatePicker
                value={departureDate}
                onChange={onDepartureDateChange}
                minDate={new Date()}
                sx={{ width: "100%" }}
              />
            </Box>
          )}

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 3,
              pt: 2,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Button
              variant="text"
              onClick={handleClose}
              sx={{
                color: "primary.main",
                fontWeight: "medium",
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleClose}
              sx={{
                // color: "primary.main",
                fontWeight: "medium",
                textTransform: "none",
                // fontSize: "1rem",
              }}
            >
              Done
            </Button>
          </Box>
        </Box>
      </Popover>
    </LocalizationProvider>
  );
}
