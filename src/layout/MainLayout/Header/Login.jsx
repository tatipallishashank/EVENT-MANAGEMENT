import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "94%",
    sm: "50%",
    lg: "35%",
  },
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

export default function LoginModal({ open, handleClose, forgotPassword }) {
  const { login, error } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handelSubmit = (e) => {
    e.preventDefault();
    Promise.all([login({ email, password })]).then((data) => {
      if (!!data[0]) {
        handleClose();
      }
      console.log("All promises have resolved");
    });
  };

  return (
    <Modal
      open={open}
      //   onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component={"form"} onSubmit={handelSubmit}>
        <IconButton
          edge="end"
          sx={{
            position: "absolute",
            right: 20,
            top: 10,
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
        <Typography
          id="modal-modal-title"
          variant="h4"
          component="h2"
          gutterBottom
        >
          Login to continue
        </Typography>
        <Divider
          sx={{
            borderColor: "#d4d4d4",
            mt: 1,
          }}
        />
        {!!error && (
          <Typography
            sx={{
              my: 2,
              textAlign: "center",
            }}
            color="error"
          >
            {error}
          </Typography>
        )}

        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "180px",
          }}
        >
          <TextField
            fullWidth
            id="outlined-basic"
            label="Email"
            variant="outlined"
            required
            type="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />

          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              value={password}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              required
              onChange={({ target }) => setPassword(target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Box
            onClick={forgotPassword}
            sx={{
              textAlign: "right",
              cursor: "pointer",
              textDecoration: "underline",
              my: 1,
              fontSize: 14,
              fontWeight: 500,
              color: "#551A8B",
            }}
          >
            Forgot Password?
          </Box>

          <Button variant="contained" color="secondary" type="submit">
            Login
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
