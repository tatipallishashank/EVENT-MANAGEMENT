import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider, IconButton, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import toast from "react-hot-toast";

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

export default function ResetPasswordModal({ open, handleClose }) {
  const { error, resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const handelSubmit = (e) => {
    e.preventDefault();
    Promise.all([resetPassword(email)]).then(() => {
      handleClose();
      toast.success("Reset Mail Sent!");
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
          Reset Password
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
            height: "120px",
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
          <Typography
            sx={{
              my: 1,
            }}
            color={"#000"}
            variant="caption"
          >
            You will receive a link to your registered email for password reset.
          </Typography>
          <Button variant="contained" color="secondary" type="submit">
            Reset
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
