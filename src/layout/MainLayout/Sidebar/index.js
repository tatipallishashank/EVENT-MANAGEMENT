import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Drawer, IconButton, Typography } from "@mui/material";

// third-party
// import PerfectScrollbar from "react-perfect-scrollbar";
// import { BrowserView, MobileView } from "react-device-detect";

// project imports
import LogoSection from "../LogoSection";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Close } from "@mui/icons-material";

// ==============================|| SIDEBAR DRAWER ||============================== //
const drawerWidth = 320;
const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
  const theme = useTheme();
  const { isAuthenticated } = useContext(AuthContext);
  const drawer = (
    <>
      <Box sx={{ display: { xs: "block", md: "none" }, position: "relative" }}>
        <Box sx={{ display: "flex", p: 2, mx: "auto" }}>
          <LogoSection />
        </Box>
        <IconButton
          onClick={drawerToggle}
          sx={{
            position: "absolute",
            right: 10,
            top: 10,
          }}
        >
          <Close />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
            width: "100%",
            padding: 3,
          }}
          className="Sidebar"
        >
          <Link to="/" className="sidebar-link">
            <Typography
              sx={{
                color: "#000",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              Home
            </Typography>
          </Link>
          {/* <Link to="services" className="sidebar-link">
            <Typography
              sx={{
                color: "#000",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              Services
            </Typography>
          </Link> */}
          <Link to="events" className="sidebar-link">
            <Typography
              sx={{
                color: "#000",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              Events Offering
            </Typography>
          </Link>
          <Link to="about" className="sidebar-link">
            <Typography
              sx={{
                color: "#000",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              About Us
            </Typography>
          </Link>
          {/* <Link to="contact" className="sidebar-link">
            <Typography
              sx={{
                color: "#000",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              Contact Us
            </Typography>
          </Link> */}

          {!!isAuthenticated ? (
            <>
              <Link to="admin" className="sidebar-link">
                <Typography
                  sx={{
                    color: "#000",
                    fontWeight: "500",
                    textTransform: "uppercase",
                  }}
                >
                  Dashboard
                </Typography>
              </Link>
            </>
          ) : null}
        </Box>
      </Box>
    </>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Drawer
      container={container}
      variant={"temporary"}
      anchor="left"
      open={drawerOpen}
      onClose={drawerToggle}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "70%", sm: drawerWidth },
          background: theme.palette.background.default,
          color: theme.palette.text.primary,
          borderRight: "none",
        },
      }}
      ModalProps={{ keepMounted: true }}
      color="inherit"
    >
      {drawer}
    </Drawer>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object,
};

export default Sidebar;
