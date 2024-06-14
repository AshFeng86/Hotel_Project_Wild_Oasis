// Styling with Tailwind CSS
import "@/app/_styles/globals.css";

// Loading and Optimizing Fonts
import { Josefin_Sans } from "next/font/google";
import Header from "@/app/_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  // Adding Page Metadata and Favicon
  title: {
    //  %s: will be replaced with whatever the title we export from individual page.js
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  // Page Description: important for SEO
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Styling with Tailwind CSS */}
      {/* Loading and Optimizing Fonts */}
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen antialiased flex flex-col `}
      >
        {/* Improving the Navigation and Root Layout */}
        <Header />
        {/* flex-1: occupies the entire space  */}
        <div className="flex-1 px-8 py-12 grid ">
          <main className="max-w-7xl mx-auto w-full">
            {/* Context API: State Management */}
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
