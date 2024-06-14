"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Sharing State Between Client and Server: The URL
export default function Filter() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All Cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;5 guests
      </Button>

      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        6&mdash;10 guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        11&mdash;more guests
      </Button>
      {/* <Link
        href="/cabins?capacity=all"
        className="px-5 py-2 hover:bg-primary-700"
      >
        All Cabins
      </Link>
      <Link
        href="/cabins?capacity=small"
        className="px-5 py-2 hover:bg-primary-700"
      >
        1&mdash;5 guests
      </Link>
      <Link
        href="/cabins?capacity=medium"
        className="px-5 py-2 hover:bg-primary-700"
      >
        6&mdash;10 guests
      </Link>
      <Link
        href="/cabins?capacity=large"
        className="px-5 py-2 hover:bg-primary-700"
      >
        11&mdash;more guests
      </Link> */}
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700  ${
        filter === activeFilter ? "text-primary-50 bg-primary-700" : null
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
