import { NextResponse } from "next/server";

const baseApi = process.env.NEXT_PUBLIC_API_URL;

function getImageLocation(payload: unknown) {
  if (!payload || typeof payload !== "object") return null;

  const record = payload as Record<string, unknown>;
  const candidates = ["location", "url", "secure_url", "src"];

  for (const key of candidates) {
    const value = record[key];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  return null;
}

export async function POST(req: Request) {
  if (!baseApi) {
    return NextResponse.json(
      { error: "NEXT_PUBLIC_API_URL is missing" },
      { status: 500 },
    );
  }

  const incomingFormData = await req.formData();
  const file = incomingFormData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "A file is required" },
      { status: 400 },
    );
  }

  const outgoingFormData = new FormData();
  outgoingFormData.append("file", file);

  const uploadRes = await fetch(`${baseApi}/api/v1/files/upload`, {
    method: "POST",
    body: outgoingFormData,
    cache: "no-store",
  });

  const payload = await uploadRes.json();
  const location = getImageLocation(payload);

  if (!uploadRes.ok || !location) {
    return NextResponse.json(
      {
        error: "Upload failed",
        payload,
      },
      { status: uploadRes.ok ? 502 : uploadRes.status },
    );
  }

  return NextResponse.json(
    {
      originalname:
        typeof (payload as Record<string, unknown>).originalname === "string"
          ? (payload as Record<string, unknown>).originalname
          : file.name,
      filename:
        typeof (payload as Record<string, unknown>).filename === "string"
          ? (payload as Record<string, unknown>).filename
          : file.name,
      location,
    },
    { status: uploadRes.status },
  );
}
