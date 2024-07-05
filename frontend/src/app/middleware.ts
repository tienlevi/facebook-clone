import { NextResponse, NextRequest } from "next/server";

const allowedOrigins = ["http://localhost:3000", "https://my-app.org"];

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin") ?? "";
  console.log(origin);
  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request",
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
  console.log(request.method);
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
