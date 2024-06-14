import Image from "next/image";
import { signInAction } from "../_lib/actions";

export default function SignInButton() {
  return (
    // Server actions: Add interactivity to server component
    // Here, we connect a server action with a form
    <form action={signInAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}
