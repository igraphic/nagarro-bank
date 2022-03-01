import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import LoggedIn from "./LoggedIn";

const Header: React.FC = () => {
  const { state } = useContext(AuthContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ABC Bank
          </Typography>
          {state.isAuthenticated && <LoggedIn user={state.user} />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
