import { auth } from "../_lib/auth";

// Adding Page Metadata and Favicon
export const metadata = {
  title: "Account",
};

export default async function Page() {
  const session = await auth();
  console.log(session);
  // Adding Nested Routes and Pages
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {session.user.name}
    </h2>
  );
}
