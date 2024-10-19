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

export default function RegisterModal({ open, handleClose }) {
  const { register, error } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handelSubmit = (e) => {
    e.preventDefault();
    Promise.all([register({ email, password, firstName, lastName })]).then(
      (data) => {
        if (!!data[0]) {
          handleClose();
        }
      }
    );
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
          Register to continue
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
            height: "300px",
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
          <TextField
            fullWidth
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            required
            type="text"
            value={firstName}
            onChange={({ target }) => setFirstName(target.value)}
          />{" "}
          <TextField
            fullWidth
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            required
            type="text"
            value={lastName}
            onChange={({ target }) => setLastName(target.value)}
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
          <Button variant="contained" color="primary" type="submit">
            Register
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
