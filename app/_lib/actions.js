"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  deleteBookingSupa,
  getBookings,
  updateGuestSupa,
  createBookingSupa,
} from "./data-service";
import { redirect } from "next/navigation";
import { supabase } from "./supabase";

// Server Action: Updating the Profile
export async function updateGuest(formData) {
  const session = await auth();
  // Working on Backend: We need to always treat all the inputs as unsafe
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  // Working on Backend: We need to always treat all the inputs as unsafe
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Please provide a valid national ID.");
  }

  const updateData = { nationality, countryFlag, nationalID };

  await updateGuestSupa(session.user.guestId, updateData);

  // Manual Cache Revalidation
  revalidatePath("/account/profile");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

// Creating a New Reservation
export async function createBooking(bookingData, formData) {
  console.log(formData);
  const session = await auth();
  // Working on Backend: We need to always treat all the inputs as unsafe
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extraPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  createBookingSupa(newBooking);
  revalidatePath(`cabin/${newBooking.cabinId}`);
  redirect("/cabins/thankyou");
}

// Server Action: Deleting a Reservation
export async function deleteReservation(bookingId) {
  const session = await auth();
  // Working on Backend: We need to always treat all the inputs as unsafe
  if (!session) throw new Error("You must be logged in");

  // Prevent Malicious Deleting
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You are  not allowed to delete this booking");
  }

  await deleteBookingSupa(bookingId);
  revalidatePath("/account/reservations");
}

// Challenge: updating a Reservation
export async function updateReservation(formData) {
  const bookingId = Number(formData.get("bookingId"));
  // console.log(formData);
  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // 2) Authorization: Prevent Malicious Deleting
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You are  not allowed to update this booking");
  }
  // 3) Building update data
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    // Prevent writing too many observations, we only take the first 1000 characters
    observations: formData.get("observations").slice(0, 1000),
  };

  // 4) Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();
  // 5) Error Handling
  if (error) {
    throw new Error("Booking could not be updated");
  }
  // 6) Revalidation: "layout" as 2nd argument, revalidate all the children of the path. Otherwise, without layout, only the input path will be revalidate
  revalidatePath(`/account/reservations`, "layout");
  // 7) Redirecting
  redirect("/account/reservations");
}
