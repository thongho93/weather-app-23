import * as React from "react";
import { StyledEngineProvider } from "@mui/material";
import { AppBar, Toolbar, Typography, CssBaseline } from "@mui/material";
import styles from "../styles/header.module.css";

function Header() {
  return (
    <StyledEngineProvider injectFirst>
      <AppBar position="static" className={styles.appbarContainer}>
        <React.Fragment>
          <CssBaseline />
          <Toolbar disableGutters sx={{ minHeight: "unset" }}>
            <Typography variant="h5" component="div">
              Stormry
            </Typography>
          </Toolbar>
        </React.Fragment>
      </AppBar>
    </StyledEngineProvider>
  );
}

export default Header;
