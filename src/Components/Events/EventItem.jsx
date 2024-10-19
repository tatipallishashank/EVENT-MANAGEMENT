import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Chip } from "@mui/material";
import { ConfirmationNumber, TaskAlt } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function EventItem({ event, book, tickets }) {
  const navigate = useNavigate();
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
      {book && (
        <Box
          sx={{
            p: 2,
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            startIcon={<TaskAlt />}
            sx={{}}
            onClick={() => {
              navigate("/events/" + event.id);
            }}
          >
            Book Now
          </Button>
        </Box>
      )}
      {tickets > 0 && (
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
            {tickets} Ticket
          </Button>
        </Box>
      )}
    </Card>
  );
}
