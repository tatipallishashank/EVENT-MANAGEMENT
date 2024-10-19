import { Alert, Chip, Grid, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { ConfirmationNumber } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import dayjs from "dayjs";
import { QRCodeSVG } from "qrcode.react";
const MyBookings = () => {
  const { events, user } = useContext(AuthContext);
  const ticketIds = [];
  console.log(user);

  const matchingEvents = user?.events?.filter((userEvent) => {
    return events.some((event) => {
      if (userEvent.id === event.id)
        ticketIds.push({ event, tickets: userEvent.tickets });

      return userEvent.id === event.id;
    });
  });
  console.log(matchingEvents, ticketIds);
  return (
    <Box
      sx={{
        my: 3,
      }}
    >
      <Grid container spacing={2} rowSpacing={3}>
        {ticketIds.length > 0 ? (
          ticketIds.map((ticketId, idx) => (
            <Grid key={idx} item xs={12} sm={6} md={4} lg={3} sx={{}}>
              <Paper elevation={2}>
                <EventItem ticketId={ticketId} user={user} />
              </Paper>
            </Grid>
          ))
        ) : (
          <Alert
            variant="standard"
            color="error"
            sx={{
              mx: "auto",
              my: 3,
            }}
          >
            No Bookings Found{" "}
          </Alert>
        )}
      </Grid>
    </Box>
  );
};

export default MyBookings;

function EventItem({ ticketId, user }) {
  const { event, tickets } = ticketId;
  return (
    <Card
      sx={{
        maxWidth: "100%",
        alignItems: "center",
      }}
    >
      <QRCodeSVG
        id="eventpass"
        value={JSON.stringify({ user })}
        level="H"
        includeMargin={true}
        size={250}
        style={{
          margin: "0 0 0 15%",
        }}
      />
      <CardMedia
        component="img"
        alt="green iguana"
        height="100%"
        image={event.image}
        sx={{
          maxHeight: "200px",
          minHeight: "200px",
          // cursor: "pointer",
          overflow: "hidden",
          // ":hover": {
          //   transform: "scale(1.2)",
          //   transition: "transform ease-in-out .4s",
          // },
        }}
      />
      <CardContent
        sx={{
          p: 2,
          pb: 0,
        }}
      >
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "39.5px",
          }}
        >
          {event.title}
          {/* <Chip
            label={`${dayjs(event.date).format(
              "ddd DD MMM YYYY [at] hh:mm A"
            )}`}
          /> */}
          <Chip label={`📆 ${dayjs(event.date).format("ddd, DD MMM")}`} />
        </Typography>
        <Typography variant="h5" color="text.primary" gutterBottom>
          📌 {event.address}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {event.categories}
        </Typography>
        <Typography variant="h3">$ {event.ticketPrice}</Typography>
        <Box
          sx={{
            p: 2,
          }}
        >
          <Button
            variant="contained"
            color="info"
            fullWidth
            startIcon={<ConfirmationNumber />}
          >
            {tickets} Tickets
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
