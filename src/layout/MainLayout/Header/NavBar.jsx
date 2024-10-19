import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import img from "../../../assets/images/users/user-round.svg";
import {
  AppRegistrationRounded,
  LockOutlined,
  Password,
  VerifiedUserOutlined,
} from "@mui/icons-material";
import LoginModal from "./Login";
import { Link } from "react-router-dom";
import RegisterModal from "./Register";
import { ADMIN } from "../../../config";
import ResetPasswordModal from "./ResetPassword";
export default function AccountMenu() {
  const { isAuthenticated, signOutUser, user } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(isAuthenticated);
  const [openModal, setOpenModal] = React.useState(false);
  const [registerModal, setRegisterModal] = React.useState(false);
  const [passwordModal, setPasswordModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenModalRegister = () => setRegisterModal(true);
  const handleCloseModalRegister = () => setRegisterModal(false);

  const handleOpenModalPassword = () => setPasswordModal(true);
  const handleCloseModalPassword = () => setPasswordModal(false);

  const forgotPassword = () => {
    setOpenModal(false);
    setPasswordModal(true);
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          display: {
            xs: "none",
            md: "flex",
          },
          alignItems: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <Box sx={{ ml: "auto" }}></Box>
        <Tooltip title="Home">
          <Link to={"/"}>
            <Button
              sx={{
                color: "#000",
                fontWeight: "600",
                fontSize: 16,
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Home
            </Button>
          </Link>
        </Tooltip>

        <Tooltip title="Explore">
          <Link to={"events"}>
            <Button
              sx={{
                ml: 2,

                color: "#000",
                fontWeight: "600",
                fontSize: 16,
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Explore
            </Button>
          </Link>
        </Tooltip>
        <Tooltip title=" About Us">
          <Link to={"about"}>
            <Button
              sx={{
                ml: 2,

                color: "#000",
                fontWeight: "600",
                fontSize: 16,
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              About Us
            </Button>
          </Link>
        </Tooltip>

        {!!isAuthenticated && !!user ? (
          <>
            {user?.email === ADMIN ? (
              <Tooltip title="ADMIN DASHBOARD">
                <Button variant="contained" sx={{ ml: "auto" }}>
                  <Link
                    to={"/admin"}
                    style={{
                      color: "#fff",
                      fontWeight: "600",
                      fontSize: 16,
                      textTransform: "uppercase",
                      textDecoration: "none",
                    }}
                  >
                    ADMIN DASHBOARD
                  </Link>
                </Button>
              </Tooltip>
            ) : (
              <>
                <Tooltip title="Create Event">
                  <Button variant="contained" sx={{ ml: "auto" }}>
                    <Link
                      to={"/admin/event"}
                      style={{
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: 16,
                        textTransform: "uppercase",
                        textDecoration: "none",
                      }}
                    >
                      Create Event
                    </Link>
                  </Button>
                </Tooltip>{" "}
                <Tooltip title="Create Event">
                  <Button variant="contained" sx={{ ml: "auto" }}>
                    <Link
                      to={"/admin/myevent"}
                      style={{
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: 16,
                        textTransform: "uppercase",
                        textDecoration: "none",
                      }}
                    >
                      My Events
                    </Link>
                  </Button>
                </Tooltip>
                <Tooltip title="My Bookings">
                  <Button variant="contained" sx={{ ml: "auto" }}>
                    <Link
                      to={"/bookings"}
                      style={{
                        color: "#fff",
                        fontWeight: "600",
                        fontSize: 16,
                        textTransform: "uppercase",
                        textDecoration: "none",
                      }}
                    >
                      My Bookings
                    </Link>
                  </Button>
                </Tooltip>
              </>
            )}
          </>
        ) : null}

        {!!isAuthenticated ? (
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: "auto" }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 38, height: 38 }} src={img}>
                M
              </Avatar>
            </IconButton>
          </Tooltip>
        ) : (
          <>
            <Button
              variant="contained"
              startIcon={<AppRegistrationRounded />}
              color="primary"
              sx={{ ml: "auto", mr: 1 }}
              onClick={handleOpenModalRegister}
            >
              <Typography
                sx={{
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: 16,
                  textTransform: "uppercase",
                }}
              >
                Register
              </Typography>
            </Button>
            <Button
              variant="contained"
              startIcon={<LockOutlined />}
              color="secondary"
              onClick={handleOpenModal}
            >
              <Typography
                sx={{
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: 16,
                  textTransform: "uppercase",
                }}
              >
                Login
              </Typography>
            </Button>
          </>
        )}
      </Box>
      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
        }}
      >
        {!!isAuthenticated ? (
          <>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: "auto" }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 38, height: 38 }} src={img}>
                  M
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>
                <ListItemIcon>
                  <VerifiedUserOutlined fontSize="small" />
                </ListItemIcon>
                {user?.firstName + " " + user?.lastName}
              </MenuItem>
              <MenuItem onClick={handleOpenModalPassword}>
                <ListItemIcon>
                  <Password fontSize="small" />
                </ListItemIcon>
                Reset Password
              </MenuItem>
              <MenuItem onClick={signOutUser}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              startIcon={<AppRegistrationRounded />}
              size="small"
              color="primary"
              sx={{ ml: "auto", mr: 1 }}
              onClick={handleOpenModalRegister}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#fff",
                  textTransform: "uppercase",
                }}
              >
                Register
              </Typography>
            </Button>
            <Button
              variant="contained"
              startIcon={<LockOutlined />}
              size="small"
              color="secondary"
              // sx={{ ml: "auto" }}
              onClick={handleOpenModal}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#fff",
                  textTransform: "uppercase",
                }}
              >
                Login
              </Typography>
            </Button>
          </>
        )}
      </Box>

      {openModal && (
        <LoginModal
          open={openModal}
          handleClose={handleCloseModal}
          forgotPassword={forgotPassword}
        />
      )}
      {passwordModal && (
        <ResetPasswordModal
          open={passwordModal}
          handleClose={handleCloseModalPassword}
        />
      )}
      {registerModal && (
        <RegisterModal
          open={registerModal}
          handleClose={handleCloseModalRegister}
        />
      )}
    </React.Fragment>
  );
}
