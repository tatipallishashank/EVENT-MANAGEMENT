import { Chip, Grid, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { deleteEvent } from "../../api/api";
import dayjs from "dayjs";
const AdminEvents = ({ edit }) => {
  const { events, setEvents } = useContext(AuthContext);

  return (
    <Box
      sx={{
        my: 3,
      }}
    >
      <Grid container spacing={2} rowSpacing={3}>
        {events.map((event, idx) => (
          <Grid key={idx} item xs={12} sm={6} md={4} lg={3}>
            <Paper elevation={2}>
              <EventItem event={event} setEvents={setEvents} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminEvents;

function EventItem({ event, setEvents }) {
  const navigate = useNavigate();
  const handelDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this event?") === true
    ) {
      const data = await deleteEvent(event.id);
      if (data) {
        setEvents((events) => events.filter((crs) => crs.id !== event.id));
      }
    }
  };
  return (
    <Card
      sx={{
        maxWidth: "100%",
      }}
    >
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
      </CardContent>
      <Box
        sx={{
          p: 2,
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          startIcon={<Edit />}
          sx={{
            mb: 2,
          }}
          onClick={() => {
            navigate("/admin/event/" + event.id);
          }}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="error"
          fullWidth
          startIcon={<Delete />}
          onClick={handelDelete}
        >
          Delete
        </Button>
      </Box>
    </Card>
  );
}
