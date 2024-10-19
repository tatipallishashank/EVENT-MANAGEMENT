import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import EventItem from "./EventItem";
import { CATEGORIES } from "../../config";
import dayjs from "dayjs";

const Events = () => {
  const { events, allEvents, setEvents } = useContext(AuthContext);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };
  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = () => {
    const filteredData = allEvents.filter((event) => {
      const { price: thePrice, category: theCategory, date: theDate } = event;

      if (!!search) {
        if (!JSON.stringify(event).toLowerCase().includes(search.toLowerCase()))
          return false;
      }

      if (!!category) {
        if (category !== theCategory) return false;
      }

      switch (price) {
        case 0:
          if (thePrice !== 0) return false;

          break;
        case 1:
          if (thePrice < 0 || thePrice > 500) return false;

          break;
        case 2:
          if (thePrice < 500 || thePrice > 2000) return false;

          break;
        case 3:
          if (thePrice < 2000) return false;

          break;

        default:
          break;
      }

      if (!!date) {
        if (!dayjs(theDate).isSame(date)) return false;
      }
      return true;
    });
    setEvents(filteredData);
  };
  return (
    <Box
      sx={{
        mb: 3,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",

          my: 3,
        }}
      >
        Top Upcomming Events
      </Typography>

      <Box
        component={"form"}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        sx={{
          my: 4,
          px: { xs: 0, md: 10 },
        }}
      >
        <Grid container columnSpacing={4}>
          <Grid item xs={12} md={3}>
            <TextField
              id="outlined-basic"
              label="Search by keyword"
              variant="outlined"
              type="text"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="date"
              placeholder="date"
              value={date}
              fullWidth
              onChange={(e) => setDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="category-select">Category</InputLabel>
                <Select
                  fullWidth
                  labelId="category-select"
                  id="category-select"
                  value={category}
                  label="Category"
                  onChange={handleCategory}
                >
                  {CATEGORIES.map((el) => (
                    <MenuItem key={el} value={el}>
                      {el}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="price-select">Price</InputLabel>
                <Select
                  fullWidth
                  labelId="price-select"
                  id="price-select"
                  value={price}
                  label="Price"
                  onChange={handlePrice}
                >
                  <MenuItem value={0}>Free</MenuItem>
                  <MenuItem value={1}>0-500</MenuItem>
                  <MenuItem value={2}>500-2000</MenuItem>
                  <MenuItem value={3}>Above 2000</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          sx={{
            height: 35,
            mt: 4,
          }}
          type="submit"
        >
          Submit
        </Button>
      </Box>

      <Grid container spacing={2} rowSpacing={3}>
        {events.length > 0 ? (
          events.map((event, idx) => (
            <Grid key={idx} item xs={12} sm={6} md={4} lg={3} sx={{}}>
              <Paper elevation={2}>
                <EventItem event={event} book />
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
            No Events Found{" "}
          </Alert>
        )}
      </Grid>
    </Box>
  );
};

export default Events;
