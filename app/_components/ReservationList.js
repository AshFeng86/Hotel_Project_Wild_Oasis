"use client";
import ReservationCard from "./ReservationCard";
// useOptimistic: Removing Reservations Immediately
import { useOptimistic } from "react";
import { deleteReservation } from "../_lib/actions";

function ReservationList({ bookings }) {
  // useOptimistic: Removing Reservations Immediately
  // const [state, stateAction] = useOptimistic(current_State, updateCallback)
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    //  (curState, bookingId): bookingId is passed from the async funciton below
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {/* useOptimistic: Removing Reservations Immediately */}
      {optimisticBookings.map((booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
