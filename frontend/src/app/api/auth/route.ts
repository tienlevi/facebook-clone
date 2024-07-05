import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch("http://localhost:8080/api/auth", {
    headers: { "Content-Type": "application/json" },
  });
  const data = response.json();
  return Response.json({ data });
  //   return NextResponse.json({ message: "Hello world" });
}
