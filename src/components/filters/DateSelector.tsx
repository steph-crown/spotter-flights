import { CalendarToday } from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputAdornment,
  TextField,
  Popover,
  Typography,
  IconButton,
  Grid,
  Button,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useState } from "react";
import { spotterBrand } from "@/theme";

interface DateSelectorProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder: string;
  ariaLabel?: string;
  minDate?: Date;
}

export function DateSelector({
  value,
  onChange,
  placeholder,
  ariaLabel = "Select date",
  minDate = new Date(),
}: DateSelectorProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [viewDate, setViewDate] = useState(new Date());
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateSelect = (date: Date) => {
    onChange(date);
    handleClose();
  };

  const getDisplayValue = () => {
    if (value) {
      return value.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
    }
    return "";
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(viewDate);
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setViewDate(newDate);
  };

  const isDateDisabled = (date: Date) => {
    return date < minDate;
  };

  const isDateSelected = (date: Date) => {
    return value && date.toDateString() === value.toDateString();
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <>
      <FormControl sx={{ minWidth: 160 }}>
        <TextField
          value={getDisplayValue()}
          placeholder={placeholder}
          onClick={handleClick}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                style={{
                  marginRight: "-0.5rem",
                }}
              >
                <CalendarToday
                  sx={{
                    color: "text.secondary",
                    fontSize: "1.1rem",
                  }}
                />
              </InputAdornment>
            ),
          }}
          inputProps={{ "aria-label": ariaLabel }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              paddingLeft: "0.125rem",
              cursor: "pointer",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderTopWidth: "0 !important",
              borderLeftWidth: "0 !important",
              borderRightWidth: "0 !important",
              borderBottomColor: "transparent",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderBottomColor: "transparent",
            },
            "& .MuiInputBase-input": {
              fontSize: "0.875rem",
              fontWeight: "medium",
              padding: "0.4rem 0.875rem",
              cursor: "pointer",
              color: value ? "text.primary" : "text.secondary",
            },
            "&:hover": {
              backgroundColor: spotterBrand.teal[50],
            },
            "&.Mui-focused": {
              backgroundColor: spotterBrand.teal[100],
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
            minWidth: 320,
            borderRadius: 2,
            boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          {/* Calendar Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <IconButton
              onClick={() => navigateMonth("prev")}
              sx={{ color: "text.secondary" }}
            >
              <ChevronLeft />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: "medium" }}>
              {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
            </Typography>
            <IconButton
              onClick={() => navigateMonth("next")}
              sx={{ color: "text.secondary" }}
            >
              <ChevronRight />
            </IconButton>
          </Box>

          {/* Day Names */}
          <Grid container spacing={0} sx={{ mb: 1 }}>
            {dayNames.map((day) => (
              <Grid key={day}>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    textAlign: "center",
                    color: "text.secondary",
                    fontWeight: "medium",
                    py: 1,
                  }}
                >
                  {day}
                </Typography>
              </Grid>
            ))}
          </Grid>

          {/* Calendar Days */}
          <Grid container spacing={0}>
            {getDaysInMonth(viewDate).map((date, index) => (
              <Grid key={index}>
                {date ? (
                  <Button
                    onClick={() => handleDateSelect(date)}
                    disabled={isDateDisabled(date)}
                    sx={{
                      width: "100%",
                      height: 40,
                      minWidth: 0,
                      borderRadius: 1,
                      fontSize: "0.875rem",
                      fontWeight: "medium",
                      color: isDateSelected(date)
                        ? "primary.contrastText"
                        : "text.primary",
                      backgroundColor: isDateSelected(date)
                        ? "primary.main"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: isDateSelected(date)
                          ? "primary.dark"
                          : spotterBrand.teal[50],
                      },
                      "&.Mui-disabled": {
                        color: "text.disabled",
                      },
                    }}
                  >
                    {date.getDate()}
                  </Button>
                ) : (
                  <Box sx={{ height: 40 }} />
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Popover>
    </>
  );
}
