import { Check } from "@mui/icons-material";
import {
  FormControl,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { spotterBrand } from "@/theme";

interface Option {
  label: string;
  value: string;
}

interface FilterSelectProps {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  options: Option[];
  icon?: React.ReactNode;
  ariaLabel?: string;
}

export function FilterSelect({
  value,
  onChange,
  options,
  icon,
  ariaLabel = "Select option",
}: FilterSelectProps) {
  return (
    <FormControl>
      <Select
        value={value}
        onChange={onChange}
        displayEmpty
        renderValue={(selected) => {
          return (
            options.find((option) => option.value === selected)?.label || ""
          );
        }}
        startAdornment={
          icon ? (
            <InputAdornment
              position="start"
              style={{
                marginRight: "-0.5rem",
              }}
            >
              {icon}
            </InputAdornment>
          ) : null
        }
        inputProps={{ "aria-label": ariaLabel }}
        sx={{
          color: "text.secondary",
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
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              "&.MuiMenuItem-root": {
                minHeight: "3rem",
                fontSize: "1rem",
                fontWeight: "medium",
              },
            }}
          >
            {value === option.value && (
              <ListItemIcon>
                <Check fontSize="small" />
              </ListItemIcon>
            )}

            {value === option.value ? (
              option.label
            ) : (
              <ListItemText inset>{option.label}</ListItemText>
            )}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
