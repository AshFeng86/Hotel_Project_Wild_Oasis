// Project Organization
// alias: @ => root folder
import CabinList from "../_components/CabinList";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

// Experimenting with Caching and ISR
// The is in seconds
export const revalidate = 15;

// Adding Page Metadata and Favicon
export const metadata = {
  title: "Cabins",
};

// Sharing State Between Client and Server: The URL
// Fetching and Displaying Cabin List
export default function Page({ searchParams }) {
  // console.log(searchParams);
  const filter = searchParams?.capacity ?? "all";
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      {/* This part doesn't depends on async data */}
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      {/* Sharing State Between Client and Server: The URL */}
      <div className="flex justify-end">
        <Filter />
      </div>
      {/* Streaming UI with suspense: Cabin List */}
      {/* Only for a certain component while loading to display fallback component <Spinner /> */}
      {/* Sharing State Between Client and Server: The URL */}
      {/* key={filter}: whenever the filter has changed, the fallback will be executed */}
      <Suspense fallback={<Spinner />} key={filter}>
        {/* Sharing State Between Client and Server: The URL */}
        <CabinList filter={filter} />
        {/* Context API: State Management */}
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
