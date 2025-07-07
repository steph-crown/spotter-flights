import { spotterBrand } from "@/theme";
import { Add, PersonOutlineOutlined, Remove } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  Popover,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

export interface PassengerCounts {
  adults: number;
  children: number;
  infantsInSeat: number;
  infantsOnLap: number;
}

interface PassengerSelectorProps {
  value: PassengerCounts;
  onChange: (passengers: PassengerCounts) => void;
  ariaLabel?: string;
}

export function PassengerSelector({
  value,
  onChange,
  ariaLabel = "Select passengers",
}: PassengerSelectorProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateCount = (type: keyof PassengerCounts, increment: boolean) => {
    const newValue = { ...value };
    if (increment) {
      newValue[type]++;
    } else {
      newValue[type] = Math.max(0, newValue[type] - 1);
    }

    // Ensure at least 1 adult
    if (type === "adults" && newValue.adults < 1) {
      newValue.adults = 1;
    }

    onChange(newValue);
  };

  const getTotalPassengers = () => {
    return (
      value.adults + value.children + value.infantsInSeat + value.infantsOnLap
    );
  };

  const getDisplayText = () => {
    const total = getTotalPassengers();
    return total;
  };

  const CounterRow = ({
    label,
    subtitle,
    count,
    onIncrement,
    onDecrement,
    minValue = 0,
  }: {
    label: string;
    subtitle?: string;
    count: number;
    onIncrement: () => void;
    onDecrement: () => void;
    minValue?: number;
  }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: 2,
        minHeight: "4rem",
      }}
    >
      <Box>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "medium",
            fontSize: "1rem",
            color: "text.primary",
          }}
        >
          {label}
        </Typography>
        {subtitle && (
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: "0.875rem",
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton
          onClick={onDecrement}
          disabled={count <= minValue}
          sx={{
            backgroundColor:
              count <= minValue ? "action.disabled" : "action.hover",
            color: count <= minValue ? "action.disabled" : "primary.main",
            width: 36,
            height: 36,
            "&:hover": {
              backgroundColor:
                count <= minValue ? "action.disabled" : "primary.light",
            },
          }}
        >
          <Remove fontSize="small" />
        </IconButton>

        <Typography
          variant="h6"
          sx={{
            minWidth: "2rem",
            textAlign: "center",
            fontWeight: "medium",
          }}
        >
          {count}
        </Typography>

        <IconButton
          onClick={onIncrement}
          sx={{
            backgroundColor: spotterBrand.teal[100],
            color: "primary.main",
            width: 36,
            height: 36,
            "&:hover": {
              backgroundColor: "primary.light",
            },
          }}
        >
          <Add fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <>
      <FormControl>
        <Select
          value={getDisplayText()}
          displayEmpty
          renderValue={() => getDisplayText()}
          onClick={handleClick}
          readOnly
          startAdornment={
            <InputAdornment
              position="start"
              style={{
                marginRight: "-0.5rem",
              }}
            >
              <PersonOutlineOutlined
                sx={{
                  color: "text.secondary",
                }}
              />
            </InputAdornment>
          }
          inputProps={{ "aria-label": ariaLabel }}
          sx={{
            color: "text.secondary",
            cursor: "pointer",
            "&.MuiSelect-root": {
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              paddingLeft: "0.125rem",
            },

            "& .MuiOutlinedInput-notchedOutline ": {
              borderTopWidth: "0 !important",
              borderLeftWidth: "0 !important",
              borderRightWidth: "0 !important",
              borderBottomColor: "transparent",
            },

            "& .Mui-focused": {
              background: spotterBrand.teal[100],
            },

            "& .MuiSelect-icon": {
              transition: "all 0.5s ease",
              color: "text.secondary",
            },

            "& .MuiInputBase-input": {
              fontSize: "0.875rem",
              fontWeight: "medium",
              padding: "0.4rem 0.875rem",
              cursor: "pointer",
            },
          }}
        >
          {/* Empty - we use Popover instead */}
        </Select>
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
            maxWidth: 400,
            borderRadius: 2,
            boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Stack spacing={0} divider={<Divider />}>
            <CounterRow
              label="Adults"
              count={value.adults}
              onIncrement={() => updateCount("adults", true)}
              onDecrement={() => updateCount("adults", false)}
              minValue={1}
            />

            <CounterRow
              label="Children"
              subtitle="Aged 2–11"
              count={value.children}
              onIncrement={() => updateCount("children", true)}
              onDecrement={() => updateCount("children", false)}
            />

            <CounterRow
              label="Infants"
              subtitle="In seat"
              count={value.infantsInSeat}
              onIncrement={() => updateCount("infantsInSeat", true)}
              onDecrement={() => updateCount("infantsInSeat", false)}
            />

            <CounterRow
              label="Infants"
              subtitle="On lap"
              count={value.infantsOnLap}
              onIncrement={() => updateCount("infantsOnLap", true)}
              onDecrement={() => updateCount("infantsOnLap", false)}
            />
          </Stack>

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
    </>
  );
}
