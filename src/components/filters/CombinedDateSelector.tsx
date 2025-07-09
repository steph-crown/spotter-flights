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
import { useState, useCallback, useMemo } from "react";

interface CombinedDateSelectorProps {
  departureDate: Date | null;
  returnDate: Date | null;
  onDepartureDateChange: (date: Date | null) => void;
  onReturnDateChange: (date: Date | null) => void;
  tripType: string;
  ariaLabel?: string;
}

const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: "short",
  day: "numeric",
  month: "short",
} as const;

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
  const isRoundTrip = tripType === "round_trip";

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleClearDeparture = useCallback(() => {
    onDepartureDateChange(null);
  }, [onDepartureDateChange]);

  const handleClearReturn = useCallback(() => {
    onReturnDateChange(null);
  }, [onReturnDateChange]);

  const formatDate = useCallback((date: Date | null) => {
    return date ? date.toLocaleDateString("en-US", DATE_FORMAT_OPTIONS) : null;
  }, []);

  const getDisplayValue = useMemo(() => {
    if (!departureDate && !returnDate) return "";

    const departureText = formatDate(departureDate) || "Departure";
    const returnText = formatDate(returnDate) || "Return";

    if (isRoundTrip) {
      const separator = isMobile ? " - " : " • ";
      return `${departureText}${separator}${returnText}`;
    }

    return departureText;
  }, [departureDate, returnDate, isRoundTrip, isMobile, formatDate]);

  const placeholder = useMemo(
    () => (isRoundTrip ? "Departure • Return" : "Departure"),
    [isRoundTrip]
  );

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
        color: getDisplayValue ? "text.primary" : "text.secondary",
      },
    }),
    [isSmallerMobile, isMobile, getDisplayValue]
  );

  const popoverPaperProps = useMemo(
    () => ({
      sx: {
        mt: 1,
        minWidth: isMobile ? 320 : 600,
        borderRadius: 2,
        boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
      },
    }),
    [isMobile]
  );

  const clearButtonSx = useMemo(
    () => ({
      pr: 0,
      pl: 0,
      py: 0,
      minWidth: "unset",
      "&:hover": {
        background: "transparent",
        boxShadow: "none",
      },
    }),
    []
  );

  const actionButtonsSx = useMemo(
    () => ({
      display: "flex",
      justifyContent: "flex-end",
      gap: 2,
      mt: 3,
      pt: 2,
      borderTop: "1px solid",
      borderColor: "divider",
    }),
    []
  );

  const renderDateSection = useCallback(
    (
      label: string,
      date: Date | null,
      onDateChange: (date: Date | null) => void,
      onClear: () => void,
      minDate?: Date
    ) => (
      <Box sx={{ flex: 1 }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={date ? "space-between" : "flex-start"}
        >
          <Typography
            variant="subtitle2"
            sx={{ mb: 1, color: "text.secondary" }}
          >
            {label}
          </Typography>

          {date && (
            <Button variant="text" sx={clearButtonSx} onClick={onClear}>
              Clear
            </Button>
          )}
        </Box>

        <DatePicker
          value={date}
          onChange={onDateChange}
          minDate={minDate || new Date()}
          sx={{ width: "100%" }}
        />
      </Box>
    ),
    [clearButtonSx]
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormControl sx={{ flex: 1, width: "100%" }}>
        <TextField
          value={getDisplayValue}
          placeholder={placeholder}
          onClick={handleClick}
          InputProps={{
            startAdornment: isSmallerMobile ? null : (
              <InputAdornment position="start">
                <CalendarToday sx={{ color: "text.secondary" }} />
              </InputAdornment>
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
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={popoverPaperProps}
      >
        <Box sx={{ p: 3 }}>
          {isRoundTrip ? (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                {renderDateSection(
                  "Departure",
                  departureDate,
                  onDepartureDateChange,
                  handleClearDeparture
                )}

                <Divider
                  orientation={isMobile ? "horizontal" : "vertical"}
                  flexItem
                />

                {renderDateSection(
                  "Return",
                  returnDate,
                  onReturnDateChange,
                  handleClearReturn,
                  departureDate || new Date()
                )}
              </Box>
            </Box>
          ) : (
            renderDateSection(
              "Departure",
              departureDate,
              onDepartureDateChange,
              handleClearDeparture
            )
          )}

          <Box sx={actionButtonsSx}>
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
                fontWeight: "medium",
                textTransform: "none",
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
