import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AboutImg from "../../assets/pictures/about.svg";
import { Mail, Phone } from "@mui/icons-material";

const About = () => {
  return (
    <>
      <Box
        sx={{
          mt: {
            xs: 3,
          },
          mb: 3,
          minHeight: "70vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Grid container>
          <Grid
            item
            md={6}
            sx={{
              display: "grid",
              placeItems: "center",
            }}
          >
            <img loading="lazy" src={AboutImg} alt="About" width={"65%"} />
          </Grid>
          <Grid item md={6}>
            <Box
              sx={{
                margin: "auto",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  textAlign: "center",
                  color: "#000",
                  mt: 3,
                  fontSize: {
                    xs: "2rem",
                    sm: "4rem",
                    md: "4rem",
                    lg: "4.5rem",
                  },
                }}
              >
                About Us
              </Typography>
              <hr
                style={{
                  height: "clamp(.5rem, .9vw, 1rem)",
                  width: "50%",
                  background: "#2196f3",
                }}
              />
              <Typography
                gutterBottom
                sx={{
                  mt: 3,
                  textAlign: "justify",
                  fontSize: "1rem",
                  color: "#000",
                }}
              >
                At EventScape, we believe in the power of bringing people
                together through unforgettable events. Our mission is to
                simplify the process of event planning and booking, making it a
                seamless and enjoyable experience for both organizers and
                attendees. standards,
              </Typography>
              <Typography
                gutterBottom
                sx={{
                  my: 2,
                  textAlign: "justify",
                  fontSize: "1rem",
                  color: "#000",
                }}
              >
                We are a passionate team of event enthusiasts, tech wizards, and
                customer-centric professionals dedicated to revolutionizing the
                event industry. With a deep appreciation for creativity,
                innovation, and seamless execution, we've set out to create a
                platform that empowers event organizers and connects individuals
                with the events that matter most to them.
              </Typography>

              <a
                href="tel:+1 222-222-2222"
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "clamp(1rem, 2.5vw, 2rem)",

                  fontWeight: "bold",
                  textDecoration: "none",
                  color: "#000",
                }}
              >
                <Phone
                  sx={{
                    color: "#2196f3",
                    fontSize: "3rem",
                    mr: 2,
                  }}
                />{" "}
                +1 222-222-2222
              </a>
              <br />
              <a
                href="mailto:admin@gmail.com"
                style={{
                  // mt: 3,
                  display: "flex",
                  alignItems: "center",
                  fontSize: "clamp(1rem, 2.5vw, 2rem)",
                  fontWeight: "bold",
                  textDecoration: "none",
                  color: "#000",
                }}
              >
                <Mail
                  sx={{
                    color: "#2196f3",
                    fontSize: "3rem",
                    mr: 2,
                  }}
                />{" "}
                admin@gmail.com
              </a>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default About;
