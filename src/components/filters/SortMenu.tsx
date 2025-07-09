import { SORT_OPTIONS } from "@/constants/filter.constants";
import type { SortByOption } from "@/interfaces/flight.interface";
import { Check } from "@mui/icons-material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface SortMenuProps {
  currentSort: SortByOption;
  onSortChange: (sortBy: SortByOption) => void;
  isSmallMobile?: boolean;
}

export function SortMenu({
  currentSort,
  onSortChange,
  isSmallMobile = false,
}: SortMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortSelect = (sortBy: SortByOption) => {
    onSortChange(sortBy);
    handleClose();
  };

  const getCurrentSortLabel = () => {
    const option = SORT_OPTIONS.find((opt) => opt.value === currentSort);
    return option?.label || "Best";
  };

  const renderMenuText = (text: string, isActive: boolean) => {
    const textNode = (
      <Typography lineHeight={2.2} fontSize={14}>
        {text}
      </Typography>
    );

    return !isActive ? <ListItemText inset>{textNode}</ListItemText> : textNode;
  };

  return (
    <div>
      <Button
        id="sort-button"
        aria-controls={open ? "sort-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="text"
        color="primary"
        sx={{ paddingRight: 2, paddingLeft: 2 }}
        size="small"
        endIcon={<SwapVertIcon />}
      >
        {!isSmallMobile && <>Sorted by</>} {getCurrentSortLabel()}
      </Button>

      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "sort-button",
          },
        }}
        sx={{
          "& .MuiMenu-list": {
            width: "14rem",
          },
        }}
      >
        <Typography variant="caption" color="textDisabled" ml={6}>
          Sort By
        </Typography>

        {SORT_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleSortSelect(option.value)}
          >
            {currentSort === option.value && (
              <ListItemIcon>
                <Check />
              </ListItemIcon>
            )}
            {renderMenuText(option.label, currentSort === option.value)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
