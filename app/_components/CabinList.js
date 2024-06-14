import { getCabins } from "@/app/_lib/data-service";
import CabinCard from "./CabinCard";
import { unstable_noStore as noStore } from "next/cache";

// Sharing State Between Client and Server: The URL
export default async function CabinList({ filter }) {
  // noStore(): Makes the component uncached, basically opts out the data cache
  noStore();
  const cabins = await getCabins();
  if (!cabins.length) return null;
  // Sharing State Between Client and Server: The URL
  let displayedCabins;
  switch (filter) {
    case "small":
      displayedCabins = cabins.filter(
        (cabin) => Number(cabin.maxCapacity) <= 5
      );
      break;
    case "medium":
      displayedCabins = cabins.filter(
        (cabin) =>
          10 > Number(cabin.maxCapacity) && Number(cabin.maxCapacity) > 5
      );
      break;
    case "large":
      displayedCabins = cabins.filter(
        (cabin) => Number(cabin.maxCapacity) >= 10
      );
      break;
    default:
      displayedCabins = cabins;
  }
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
