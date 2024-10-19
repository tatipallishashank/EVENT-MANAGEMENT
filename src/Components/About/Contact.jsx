import { Call, Email, LocationCity } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Contact = () => {
  return (
    <>
      <Box id="contact">
        <Box className="contact-banner">
          <Typography
            variant="h1"
            color="white"
            sx={{
              position: "absolute",
              top: "38%",
              left: "15%",
              fontSize: {
                xs: "1.4rem",
                sm: "2rem",
                md: "3rem",
              },
            }}
          >
            Contact Us
          </Typography>
        </Box>
        <Box
          sx={{
            margin: "auto",
            my: 6,
            mb: 8,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              textAlign: "center",
              mb: 3,
            }}
          >
            Get In Touch
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <Box
              sx={{
                flexBasis: "clamp(320px,350px,420px)",
                height: "150px",
                borderRadius: "10px",
                textAlign: "center",
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                rowGap: 3,
                boxShadow: "0 8px 20px 5px rgb(0 0 0 / 20%)",
              }}
            >
              <Email />
              <Typography>Email: admin@gmail.com</Typography>
            </Box>
            <Box
              sx={{
                flexBasis: "clamp(320px,350px,420px)",
                height: "150px",
                borderRadius: "10px",
                textAlign: "center",
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                rowGap: 3,

                boxShadow: "0 8px 20px 5px rgb(0 0 0 / 20%)",
              }}
            >
              <LocationCity />
              <Typography>Location: Hyderabad</Typography>
            </Box>
            <Box
              sx={{
                flexBasis: "clamp(320px,350px,420px)",
                height: "150px",
                borderRadius: "10px",
                textAlign: "center",
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                rowGap: 3,

                boxShadow: "0 8px 20px 5px rgb(0 0 0 / 20%)",
              }}
            >
              <Call />
              <Typography>Phone: +91 9398262808</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Contact;
