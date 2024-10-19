import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import Loadable from "../Helpers/Loadable";
import MinimalLayout from "../layout/MinimalLayout";
import MainLayout from "../layout/MainLayout";
import Events from "../Components/Events/Events";
import Event from "../Components/Events/Event";
import About from "../Components/About/About";
import Dashboard from "../Components/Dashboard/Dashboard";
import AdminEvent from "../Components/Events/AdminEvent";
import BookingModal from "../Components/Events/BookingModal";
import RequireAdmin from "../Helpers/RequireAdmin";
import MyEvents from "../Components/Events/MyEvents";
import MyBookings from "../Components/Events/MyBookings";
const Home = Loadable(lazy(() => import("../Components/Home/Home")));

export default function ROUTES() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          exact
          data-testid="routes-component"
          path="/"
          element={<Home />}
        />
        <Route exact path="/events" element={<Events />} />
        <Route exact path="/events/:id" element={<Event />} />
        <Route exact path="/about" element={<About />} />

        <Route
          exact
          path="/admin"
          element={
            <RequireAdmin>
              <Dashboard />
            </RequireAdmin>
          }
        />
        <Route
          exact
          path="/admin/event"
          element={
            <MinimalLayout>
              <AdminEvent />
            </MinimalLayout>
          }
        />
        <Route
          exact
          path="/admin/myevent"
          element={
            <MinimalLayout>
              <MyEvents />
            </MinimalLayout>
          }
        />
        <Route
          exact
          path="/admin/event/:eventId"
          element={
            <MinimalLayout>
              <AdminEvent />
            </MinimalLayout>
          }
        />
        <Route
          exact
          path="/booking/:eventId/:tickets"
          element={
            <MinimalLayout>
              <BookingModal />
            </MinimalLayout>
          }
        />
        <Route
          exact
          path="/bookings"
          element={
            <MinimalLayout>
              <MyBookings />
            </MinimalLayout>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
