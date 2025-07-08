import { CalendarToday } from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputAdornment,
  TextField,
  Popover,
  Typography,
  Button,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState } from "react";
import {
  MOBILE_BREAKPOINT_MAX_WIDTH,
  SMALLER_MOBILE_BREAKPOINT_MAX_WIDTH,
} from "@/constants/ui.constants";

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
  const [activeField, setActiveField] = useState<"departure" | "return">(
    "departure"
  );
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
              {/* Date Selection Tabs */}
              {isMobile && (
                <Box sx={{ display: "flex", mb: 2 }}>
                  <Button
                    onClick={() => setActiveField("departure")}
                    variant={
                      activeField === "departure" ? "contained" : "outlined"
                    }
                    sx={{
                      flex: 1,
                      mr: 1,
                      textTransform: "none",
                      fontSize: "0.875rem",
                    }}
                  >
                    Departure
                  </Button>
                  <Button
                    onClick={() => setActiveField("return")}
                    variant={
                      activeField === "return" ? "contained" : "outlined"
                    }
                    sx={{
                      flex: 1,
                      ml: 1,
                      textTransform: "none",
                      fontSize: "0.875rem",
                    }}
                  >
                    Return
                  </Button>
                </Box>
              )}

              {/* Date Pickers */}
              {isMobile ? (
                <Box>
                  {activeField === "departure" ? (
                    <DatePicker
                      value={departureDate}
                      onChange={onDepartureDateChange}
                      minDate={new Date()}
                      sx={{ width: "100%" }}
                    />
                  ) : (
                    <DatePicker
                      value={returnDate}
                      onChange={onReturnDateChange}
                      minDate={departureDate || new Date()}
                      sx={{ width: "100%" }}
                    />
                  )}
                </Box>
              ) : (
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 1, color: "text.secondary" }}
                    >
                      Departure
                    </Typography>
                    <DatePicker
                      value={departureDate}
                      onChange={onDepartureDateChange}
                      minDate={new Date()}
                      sx={{ width: "100%" }}
                    />
                  </Box>
                  <Divider orientation="vertical" flexItem />
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 1, color: "text.secondary" }}
                    >
                      Return
                    </Typography>
                    <DatePicker
                      value={returnDate}
                      onChange={onReturnDateChange}
                      minDate={departureDate || new Date()}
                      sx={{ width: "100%" }}
                    />
                  </Box>
                </Box>
              )}
            </Box>
          ) : (
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ mb: 1, color: "text.secondary" }}
              >
                Departure
              </Typography>
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
              justifyContent: "space-between",
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
              variant="text"
              onClick={handleClose}
              sx={{
                color: "primary.main",
                fontWeight: "medium",
                textTransform: "none",
                fontSize: "1rem",
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
