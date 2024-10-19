import StripeCheckout from "react-stripe-checkout";
import React, { useContext, useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
// import Confetti from "react-confetti";

import { QRCodeSVG } from "qrcode.react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useParams } from "react-router-dom";
import EventItem from "./EventItem";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Paper,
} from "@mui/material";
import { saveUserEvent } from "../../api/api";
function BookingModal() {
  const { user, allEvents, setUser } = useContext(AuthContext);
  // const { width, height } = useWindowSize();
  const [payment, setPayment] = useState(false);

  const { eventId, tickets } = useParams();

  const event = allEvents.find((event) => event.id === eventId);
  console.log(allEvents);
  const priceForStripe = event?.ticketPrice * tickets;
  if (event) {
    const publishableKey =
      "pk_test_51Ht8t0AUGh2stU4g2NhzjhmzwmSJ6Mt3ghnJAbE6L6xGm0BpbgVQaids6bI9ZboSENHhYe87U2VVsai87mR3QdeJ00VoxGi0Ho";
    const onToken = () => {
      setPayment(true);
      saveUserEvent(event, user, tickets);

      setUser((user) => {
        return {
          ...user,
          events: [...user?.events, { id: event.id, tickets }],
        };
      });
    };

    const downloadQR = () => {
      const canvas = document.getElementById("eventpass");
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${user.firstName + "_" + user.lastName}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
    return (
      <>
        {/* {payment && <Confetti width={width - 100} height={height - 100} />} */}
        <div style={{ marginTop: "5%" }}>
          {payment ? (
            <>
              <Card sx={{ maxWidth: 345, mx: "auto" }}>
                <CardContent>
                  <Alert>Thank you for your purchase!</Alert>
                  <QRCodeSVG
                    id="eventpass"
                    value={JSON.stringify({ ...user, tickets })}
                    level="H"
                    ncludeMargin={true}
                    size={290}
                  />
                </CardContent>
                <CardActions
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  <Button size="small" variant="contained" onClick={downloadQR}>
                    {" "}
                    Download QR{" "}
                  </Button>
                </CardActions>
              </Card>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                p: 3,
                gap: 4,
              }}
            >
              <Paper elevation={2} sx={{ width: 400 }}>
                <EventItem event={event} tickets={tickets} />
              </Paper>
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <StripeCheckout
                  label="Make Payment"
                  name="Event Management"
                  billingAddress
                  shippingAddress
                  description={`Your total is ${priceForStripe}.00`}
                  amount={priceForStripe}
                  panelLabel="Pay Now"
                  token={onToken}
                  stripeKey={publishableKey}
                ></StripeCheckout>
                <p className="text-white mt-3">
                  <i class="fas fa-lock"></i> By clicking "Pay Now" you agree to
                  the terms and conditions.
                </p>
              </div>
            </Box>
          )}
        </div>
      </>
    );
  } else {
    return <Navigate to="/" replace />;
  }
}

export default BookingModal;
