import { Add, ExpandMore, Remove } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import dayjs from "dayjs";

const Event = () => {
  const { id } = useParams();
  const { events } = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  const [tickets, setTickets] = useState(0);
  useEffect(() => {
    if (id && events.length > 0) {
      const event = events.find((el) => el.id === id);
      if (event) {
        setEvent(event);
      } else {
        navigate("/");
      }
    }
  }, [id, events]);

  return (
    <>
      {!!event && (
        <>
          <Box
            sx={{
              height: {
                sm: "50vh",
                md: "50vh",
              },
              background:
                "url(https://images.unsplash.com/photo-1617634795446-b58c985ec639?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Box
              sx={{
                height: {
                  sm: "50vh",
                  md: "50vh",
                },
                background: `url(${event.image})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "end",
                justifyContent: "center",
              }}
            ></Box>
          </Box>
          <Box
            sx={{
              bgcolor: "#f0f0f0",
              height: "120px",
              p: 1.5,
              position: "relative",
            }}
          >
            <Typography gutterBottom variant="h2">
              {event.title}
            </Typography>

            <Typography gutterBottom variant="p" marginBottom={2}>
              Comedy | English | 21yrs + | 1hr
            </Typography>
            <Box
              sx={{
                my: 2,
              }}
            />

            <Typography
              gutterBottom
              variant="p"
              sx={{
                mr: 3,
                fontWeight: 600,
              }}
            >
              📆{dayjs(event.date).format("ddd DD MMM YYYY [at] hh:mm A")}
            </Typography>
            <Typography
              gutterBottom
              variant="p"
              sx={{
                mr: 3,
              }}
            >
              📌 {event.address}
            </Typography>
            <Typography
              gutterBottom
              variant="p"
              sx={{
                mr: 3,
              }}
            >
              | &nbsp;&nbsp; 💲{event.ticketPrice}
            </Typography>

            <Box
              sx={{
                position: "absolute",
                right: 10,
                top: 10,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  mb: 2,
                }}
                className="Add"
              >
                <IconButton
                  onClick={() => {
                    setTickets((tickets) => tickets + 1);
                  }}
                  disabled={tickets === 10}
                >
                  <Add />
                </IconButton>
                {tickets}
                <IconButton
                  onClick={() => {
                    setTickets((tickets) => tickets - 1);
                  }}
                  disabled={tickets === 0}
                >
                  <Remove />
                </IconButton>
              </Box>
              <Link to={`/booking/${event.id}/${tickets}`}>
                <Button
                  variant="contained"
                  sx={{
                    height: 40,
                    width: 110,
                    color: "white",
                  }}
                  onClick={() => {
                    navigate(`/booking/${event.id}`);
                  }}
                  disabled={tickets <= 0}
                >
                  Book
                </Button>
              </Link>
            </Box>
          </Box>
          <Typography
            variant="h3"
            sx={{
              my: 3,
              textAlign: "left",
            }}
          >
            About Event
          </Typography>
          <div
            style={{
              padding: "0 10px",
            }}
            dangerouslySetInnerHTML={{ __html: event.description }}
          ></div>
          <Box>
            <Accordion
              sx={{
                outline: "1px solid #eee",
                mt: 2,
                "::before": {
                  background: "transparent",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Terms & Conditions</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  background: "#fff",
                }}
              >
                <div>
                  <p>1. Tickets once booked cannot be exchanged or refunded</p>
                  <p>
                    2. An Internet handling fee per ticket may be levied. Please
                    check the total amount before payment
                  </p>
                  <p>
                    3. We recommend that you arrive at-least 30 minutes prior at
                    the venue for a seamless entry&nbsp;
                  </p>
                  <p>
                    4. It is mandatory to wear masks at all times and follow
                    social distancing norms
                  </p>
                  <p>5. Please do not purchase tickets if you feel sick</p>
                  <p>
                    6. Unlawful resale (or attempted unlawful resale) of a
                    ticket would lead to seizure or cancellation of that ticket
                    without refund or other compensation
                  </p>
                  <p>7. Rights of admission reserved</p>
                  <p>
                    8. These terms and conditions are subject to change from
                    time to time at the discretion of the organizer
                  </p>
                  <p>
                    <strong>COVID SAFETY GUIDELINES</strong>
                  </p>
                  <ul>
                    <li>
                      Owing to the recent conditions surrounding the COVID – 19
                      pandemic, as a pre-condition to gaining access to the
                      venue (events and theatres) you are required to be fully
                      vaccinated and may be required to display your COVID – 19
                      certificate at the venue as per the various norms
                      /regulations prevailing in the said State. The venue
                      provider and governing authorities reserve the right to
                      exclude any user from the venue if there are sufficient
                      grounds to believe so for failure to abide by the
                      protocols. You agree to exit without protest or refund.
                      Users are required to check the restrictions as applicable
                      in their State
                    </li>
                    <li>
                      Use of masks is mandatory at all times and the visitors
                      are required to maintain social distancing norms. The
                      venue and Bigtree reserve the right to change/modify the
                      terms and conditions.
                    </li>
                    <li>
                      Bigtree does not assume any responsibility with regards to
                      any injury or complications due to COVID – 19 accrued as a
                      result of your participation.
                    </li>
                    <li>
                      The above guidelines are currently mandatory for&nbsp;
                      <strong>Delhi/NCR, Maharashtra and Karnataka</strong>.
                      These terms and conditions may vary depending on the state
                      where the event is held and are subject to changes
                    </li>
                  </ul>
                  <p>
                    <br />
                  </p>
                </div>
              </AccordionDetails>
            </Accordion>
          </Box>

          {/* <Typography
            variant="h1"
            sx={{
              my: 3,
              mb: 2,
              textAlign: "center",
            }}
          >
            Training Features
          </Typography> */}
          {/* 
          <Box>
            <Grid container columnSpacing={2}>
              <Grid
                item
                lg={4}
                md={6}
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  className="item box-bg1"
                  style={{
                    background: "#E3FDFD",
                  }}
                >
                  {" "}
                  <span className="icon feature_box_col_four">
                    <img
                      loading="lazy"
                      src="https://img.icons8.com/bubbles/100/null/home-page.png"
                      alt="learn from home"
                    />
                  </span>
                  <Typography gutterBottom variant="h3">
                    Learn from home
                  </Typography>
                  <Typography variant="body2">Stay safe indoors.</Typography>
                </div>
              </Grid>
              <Grid
                item
                lg={4}
                md={6}
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  className="item box-bg2"
                  style={{
                    background: "#FFE2E2",
                  }}
                >
                  {" "}
                  <span className="icon feature_box_col_four">
                    <img
                      loading="lazy"
                      src="https://img.icons8.com/bubbles/100/null/trust.png"
                      alt="beginner friendly"
                    />
                  </span>
                  <Typography gutterBottom variant="h3">
                    Beginner friendly
                  </Typography>
                  <Typography variant="body2">
                    No prior knowledge required
                  </Typography>
                </div>
              </Grid>
              <Grid
                item
                lg={4}
                md={6}
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  className="item box-bg3"
                  style={{
                    background: "#fef2cd",
                  }}
                >
                  {" "}
                  <span className="icon feature_box_col_four">
                    <img
                      loading="lazy"
                      src="https://img.icons8.com/bubbles/100/null/short-hair-lady-question-mark.png"
                      alt="doubt clearing"
                    />
                  </span>
                  <Typography gutterBottom variant="h3">
                    Doubt clearing
                  </Typography>
                  <Typography variant="body2">Through Q&amp;A forum</Typography>
                </div>
              </Grid>
              <Grid
                item
                lg={4}
                md={6}
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  className="item box-bg4"
                  style={{
                    background: "#B3FFAE",
                  }}
                >
                  {" "}
                  <span className="icon feature_box_col_four">
                    <img
                      loading="lazy"
                      src="https://img.icons8.com/bubbles/100/null/task.png"
                      alt="projects"
                    />
                  </span>
                  <Typography gutterBottom variant="h3">
                    Build a projects
                  </Typography>
                  <Typography variant="body2">
                    For hands-on practice.
                  </Typography>
                </div>
              </Grid>
              <Grid
                item
                lg={4}
                md={6}
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  className="item box-bg5"
                  style={{
                    background: "#e2e7ff",
                  }}
                >
                  {" "}
                  <span className="icon feature_box_col_four">
                    <img
                      loading="lazy"
                      src="https://img.icons8.com/bubbles/100/null/downloading-updates.png"
                      alt="downloadable content"
                    />
                  </span>
                  <Typography gutterBottom variant="h3">
                    Downloadable content
                  </Typography>
                  <Typography variant="body2">With lifetime access</Typography>
                </div>
              </Grid>
              <Grid
                item
                lg={4}
                md={6}
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  className="item box-bg6"
                  style={{
                    background: "#f3d7fb",
                  }}
                >
                  {" "}
                  <span className="icon feature_box_col_four">
                    <img
                      loading="lazy"
                      src="https://img.icons8.com/bubbles/100/null/certificate.png"
                      alt="beginner friendly1"
                    />
                  </span>
                  <Typography gutterBottom variant="h3">
                    Event Completion Certificate
                  </Typography>
                  <Typography variant="body2">from LTB infotech IT</Typography>
                </div>
              </Grid>
            </Grid>
          </Box> */}
          <Typography
            variant="h1"
            sx={{
              my: 3,
              textAlign: "center",
            }}
          >
            Frequently asked questions
          </Typography>
          <Box
            sx={{
              mb: 3,
            }}
          >
            <Accordion
              sx={{
                background: "#eee",
                outline: "1px solid #eee",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  How do I search for events on the platform?
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  background: "#fff",
                }}
              >
                <div>
                  You can use the search bar on the homepage to enter keywords
                  related to the event you're looking for. Additionally, you can
                  browse events by categories or use filters to narrow down your
                  search.
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                background: "#eee",
                outline: "1px solid #eee",
                mt: 2,
                "::before": {
                  background: "transparent",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  Can I view details about an event before booking tickets?
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  background: "#fff",
                }}
              >
                <div>
                  Yes, each event has a dedicated page with detailed information
                  including the event description, date and time, venue details,
                  ticket prices, and more.
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                background: "#eee",
                outline: "1px solid #eee",
                mt: 2,
                "::before": {
                  background: "transparent",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>How do I book tickets for an event?</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  background: "#fff",
                }}
              >
                <div>
                  Once you've found the event you're interested in, click on it
                  to view the details. On the event page, there should be a
                  "Book Now" or similar button. Clicking on it will take you
                  through the ticket booking process.
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                background: "#eee",
                outline: "1px solid #eee",
                mt: 2,
                "::before": {
                  background: "transparent",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  Is there a cancellation or refund policy for booked tickets?
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  background: "#fff",
                }}
              >
                <div>
                  The cancellation and refund policies vary for each event and
                  are usually outlined during the booking process. Some events
                  may have a no-refund policy, while others might allow
                  cancellations with certain conditions.
                </div>
              </AccordionDetails>
            </Accordion>
          </Box>
        </>
      )}
    </>
  );
};

export default Event;
