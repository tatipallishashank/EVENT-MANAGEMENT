import {
  Alert,
  Button,
  Collapse,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useScriptRef from "../../Helpers/useScriptRef";
import { db, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CloseOutlined } from "@mui/icons-material";
import { doc, setDoc } from "firebase/firestore";
import uniqid from "uniqid";
import { AuthContext } from "../../context/AuthContext";
import Drop from "./DropZone/Drop";
import * as dayjs from "dayjs";
import { CATEGORIES } from "../../config";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["address", "video"],
    ["clean"],
  ],
};
const AdminEvent = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [image, setImage] = useState({
    src: "https://cdn1.iconfinder.com/data/icons/rounded-black-basic-ui/139/Photo_Add-RoundedBlack-512.png",
  });
  const [description, setDescription] = useState("");

  const { events, setEvents, user } = useContext(AuthContext);

  //   const [downloadEventContent, setDownloadEventContent] = useState("");
  const scriptedRef = useScriptRef();

  const navigate = useNavigate();
  useEffect(() => {
    if (eventId && events.length > 0) {
      console.log("Update Event Page");
      const event = events.find((event) => event.id === eventId);
      if (event) {
        setEvent(event);
        setDescription(event.description);
        setImage({
          src: event.image,
        });
      } else {
        navigate("/");
      }
    } else {
      setEvent(null);
      setDescription("");
      console.log("Create Event Page");
    }
  }, [eventId, events]);

  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);

  const handelFormSubmit = async (values) => {
    setLoading(true);
    try {
      const eventObj = {
        ...values,
        description,
      };
      delete eventObj.submit;

      if (image.file) {
        const unid = uniqid();
        let storageRef = ref(storage, unid);

        await uploadBytes(storageRef, image.file);
        console.log("Uploaded a blob or file!");
        const URL = await getDownloadURL(storageRef);
        if (URL) {
          // appendImage(URL, unid);
          eventObj.image = URL;
        } else {
          console.log("Image Failed To Upload");
        }
      } else {
        eventObj.image = image.src;
      }

      if (eventId) {
        eventObj.id = eventId;
        await updateEvent(eventObj);
      } else {
        await createEvent(eventObj);
      }
      console.log(eventObj);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    setUpdated(true);
  };

  const updateEvent = async (eventObj) => {
    const eventRef = doc(db, "events", eventId);

    await setDoc(eventRef, eventObj, { merge: true });

    const updatedEvents = events.map((event) => {
      if (event.id === eventObj.id) {
        return eventObj;
      } else return event;
    });
    setEvents(updatedEvents);
  };

  const createEvent = async (eventObj) => {
    const genratedID = uniqid();
    eventObj.id = genratedID;
    eventObj.organizer = user;

    const eventRef = doc(db, "events", genratedID);
    await setDoc(eventRef, eventObj);

    setEvents((events) => [...events, eventObj]);
  };
  // const eventObj = {
  //   title,
  //   description,
  //   date,
  //   address,
  //   organizer,
  //   categories,
  //   ticketPrice,
  //   maxCapacity,
  //   availableTickets,
  //   participants,
  // };
  return (
    <Box
      sx={{
        py: "20px",
      }}
    >
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography
          sx={{
            textAlign: "center",
          }}
          variant="h1"
          className="test"
          gutterBottom
        >
          {!!eventId ? "Update" : "Create"} Event
        </Typography>
        <Formik
          initialValues={{
            title: event?.title || "",
            date: event?.date || "",
            ticketPrice: event?.ticketPrice || "",
            duration: event?.duration || "",
            address: event?.address || "",
            categories: event?.categories || "",
            submit: null,
          }}
          enableReinitialize
          validationSchema={Yup.object().shape({
            title: Yup.string().min(3).max(50).required("Name is required"),
            date: Yup.date().required("Event Date is required"),
            ticketPrice: Yup.number().required("Price is required"),
            duration: Yup.number().required("Duration is required"),
            address: Yup.string()
              .min(3)
              .max(50)
              .required("Addresss is required"),
            categories: Yup.string().required("Categories is required"),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              if (scriptedRef.current) {
                setStatus({ success: true });
                setSubmitting(true);
                handelFormSubmit(values);
              }
            } catch (err) {
              console.error(err);
              if (scriptedRef.current) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <FormControl
                fullWidth
                error={Boolean(touched.title && errors.title)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-email-register">
                  Event Name
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email-register"
                  type="text"
                  value={values.title}
                  name="title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{}}
                />
                {touched.title && errors.title && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text--register"
                  >
                    {errors.title}
                  </FormHelperText>
                )}
              </FormControl>

              <Typography variant="h3" sx={{ my: 1 }} component="legend">
                About The Event
              </Typography>
              <ReactQuill
                modules={modules}
                theme="snow"
                onChange={setDescription}
                placeholder="Content goes here..."
                value={description}
              />

              <Grid
                container
                columnSpacing={4}
                sx={{
                  my: 2,
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Grid
                  item
                  xs={12}
                  md={3}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FormControl
                    fullWidth
                    error={Boolean(touched.date && errors.date)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <OutlinedInput
                      type="datetime-local"
                      value={values.date}
                      name="date"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.date && errors.date ? (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.date}
                      </FormHelperText>
                    ) : (
                      <FormHelperText id="standard-weight-helper-text--register">
                        Event Date
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={3}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.ticketPrice && errors.ticketPrice)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <OutlinedInput
                      type="number"
                      value={values.ticketPrice}
                      name="ticketPrice"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.ticketPrice && errors.ticketPrice ? (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.ticketPrice}
                      </FormHelperText>
                    ) : (
                      <FormHelperText id="standard-weight-helper-text--register">
                        $ Ticket Price
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.duration && errors.duration)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <OutlinedInput
                      type="number"
                      value={values.duration}
                      name="duration"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.duration && errors.duration ? (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.duration}
                      </FormHelperText>
                    ) : (
                      <FormHelperText id="standard-weight-helper-text--register">
                        Event Duration
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={3}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.categories && errors.categories)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <Select
                      labelId="category-select"
                      id="category-select"
                      value={values.categories}
                      name="categories"
                      label="Category"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      {CATEGORIES.map((el) => (
                        <MenuItem key={el} value={el}>
                          {el}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.categories && errors.categories ? (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.categories}
                      </FormHelperText>
                    ) : (
                      <FormHelperText id="standard-weight-helper-text--register">
                        Category
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>

              <FormControl
                fullWidth
                error={Boolean(touched.address && errors.address)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-email-register">
                  Address
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email-register"
                  type="text"
                  value={values.address}
                  name="address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  inputProps={{}}
                />
                {touched.address && errors.address && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text--register"
                  >
                    {errors.address}
                  </FormHelperText>
                )}
              </FormControl>
              <Drop setImage={setImage} image={image} />
              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}
              {/* {!!error && (
                <Box sx={{ mt: 2 }}>
                  <FormHelperText
                    sx={{
                      textAlign: "center",
                    }}
                    error
                  >
                    {error}
                  </FormHelperText>
                </Box>
              )} */}
              {loading ? (
                <LinearProgress sx={{ my: 2 }} color="secondary" />
              ) : null}
              <Collapse in={updated}>
                <Alert
                  color="info"
                  action={
                    <IconButton
                      aria-label="close"
                      color="info"
                      size="small"
                      onClick={() => {
                        setUpdated(false);
                      }}
                    >
                      <CloseOutlined fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  Event {!!eventId ? "Updated" : "Created"} Successfully!!
                </Alert>
              </Collapse>
              {!updated ? (
                <Stack
                  sx={{ mt: 2, justifyContent: "center" }}
                  spacing={3}
                  direction="row"
                >
                  <Button
                    // disabled
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="secondary"
                  >
                    {!!eventId ? "Update" : "Create"} Event
                  </Button>
                  <Button
                    // disabled
                    fullWidth
                    size="large"
                    type="button"
                    variant="contained"
                    color="warning"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Cancel
                  </Button>
                </Stack>
              ) : (
                <Stack
                  sx={{ mt: 2, justifyContent: "center" }}
                  spacing={3}
                  direction="row"
                >
                  <Button
                    disableElevation
                    // disabled
                    fullWidth
                    size="large"
                    type="button"
                    variant="contained"
                    color="info"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Go Back
                  </Button>
                </Stack>
              )}
            </form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default AdminEvent;
