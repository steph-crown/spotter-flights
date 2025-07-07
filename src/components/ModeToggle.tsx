import { Check } from "@mui/icons-material";
import NightlightRoundOutlinedIcon from "@mui/icons-material/NightlightRoundOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  useColorScheme,
} from "@mui/material";
import { useState } from "react";

export function ModeToggle() {
  const { mode, setMode } = useColorScheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = (mode: "light" | "dark" | "system") => {
    setMode(mode);
    handleClose();
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
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {mode === "light" ? (
          <NightlightRoundOutlinedIcon />
        ) : (
          <WbSunnyOutlinedIcon />
        )}
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
        sx={{
          "& .MuiMenu-list": {
            width: "12.75rem",
          },
        }}
      >
        <Typography variant="caption" color="textDisabled" ml={6}>
          Appearance
        </Typography>

        <MenuItem
          onClick={() => {
            handleToggle("system");
          }}
        >
          {mode === "system" && (
            <ListItemIcon>
              <Check />
            </ListItemIcon>
          )}

          {renderMenuText("Use device default", mode === "system")}
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleToggle("dark");
          }}
        >
          {mode === "dark" && (
            <ListItemIcon>
              <Check />
            </ListItemIcon>
          )}

          {renderMenuText("Dark theme", mode === "dark")}
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleToggle("light");
          }}
        >
          {mode === "light" && (
            <ListItemIcon>
              <Check />
            </ListItemIcon>
          )}

          {renderMenuText("Light theme", mode === "light")}
        </MenuItem>
      </Menu>
    </div>
  );
}
