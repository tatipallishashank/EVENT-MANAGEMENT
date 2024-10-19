import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { Alert, Chip, Collapse } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Events from "../Events/Events";
import Slider from "../Slider/Slider";
import Students from "../Slider/Students";

const Home = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Collapse in={open}>
        <Alert
          variant="filled"
          onClose={() => {
            setOpen(false);
          }}
          sx={{
            zIndex: "3333",
            display: "flex",
            my: 2,
            backgroundColor: "#e6ecef",
            color: "#000000",
            "& .MuiAlert-message": {
              display: "flex",
              width: "100%",
            },
          }}
          icon={false}
        >
          <Box
            sx={{
              ml: "auto",

              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <Chip label="Hot" variant="filled" color="error" /> 🔥 Intro price.
            Get All events for big sale -20%off.
          </Box>
          <Box
            sx={{
              mx: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            For Enquiry
            <a
              href="tel:+91 9398262808"
              style={{
                fontWeight: "bold",
                textDecoration: "none",
                marginLeft: "8px",
                color: "#000000",
              }}
            >
              +1 333-222-3333
            </a>
          </Box>

          <Box
            sx={{
              ml: "auto",
              width: "20%",
              justifyContent: "space-around",
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <Facebook />
            <Twitter />
            <LinkedIn />
            <Instagram />
          </Box>
        </Alert>
      </Collapse>

      <Slider />
      <Events />
      <Students />
    </>
  );
};

export default Home;
