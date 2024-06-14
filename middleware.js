/*
import { NextResponse } from "next/server";

export function middleware(request) {
  console.log(request);

  return NextResponse.redirect(new URL("/about", request.url));
}
*/

import { auth } from "@/app/_lib/auth";
export const middleware = auth;

// matcher: specify an arry of all the routes in which this middleware should actually run
export const config = {
  matcher: ["/account"],
};
