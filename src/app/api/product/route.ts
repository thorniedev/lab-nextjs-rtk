import { NextRequest, NextResponse } from "next/server";

const baseApi = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  const res = await fetch(`${baseApi}/api/v1/products`,{
     cache: "no-store",
  });

  const data = await res.json();
  return NextResponse.json(data);

//   return NextResponse.json({
//     message: "Hello from product",
//     status: 200,
//     headers: {
//       "Content-Type": "text/plain; charset=utf-8",
//     },
//   });
}

export async function POST(req: NextRequest) {
  const payload = await req.json();

  const res = await fetch(`${baseApi}/api/v1/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
