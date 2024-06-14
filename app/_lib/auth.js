import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecrect: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  // Protecting Routes w/ Auth.js Middleware
  callbacks: {
    // authorized: return true / false
    authorized({ auth, request }) {
      if (auth?.user) return true;
      return false;
    },
    // Creating a New Guest on First Sign in
    // This callback runs "before" the acutal sign in process happens
    async signIn({ user, account, profile }) {
      // If the username email is NOT in our supabase guests table, we add a new row to the table
      try {
        const existingGuest = await getGuest(user.email);
        if (!existingGuest)
          await createGuest({
            email: user.email,
            fullName: user.name,
          });

        return true;
      } catch {
        return false;
      }
    },

    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  // Building a Custom Sign In Page
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  handlers: { GET, POST },
  // Building a Custom Sign In Page
  signIn,
  signOut,
} = NextAuth(authConfig);
