/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fetching and Displaying Cabin List
  images: {
    domains: ["lh3.googleusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qhghcamsuamzefvjsacx.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  // Static Site Generation
  // output: "export" => our site get exported completely as static assets that we can deploy anywhere
  // output: "export",
};

export default nextConfig;
