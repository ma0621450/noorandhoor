import { parseEnquiry, sendEnquiryEmail } from "@/lib/enquiry";

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = parseEnquiry(body);
  if (!parsed.ok) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  if (parsed.spam) {
    return Response.json({ ok: true });
  }

  try {
    const sent = await sendEnquiryEmail(parsed.data);
    return Response.json({ ok: true, fallback: sent ? null : "formsubmit" });
  } catch (error) {
    console.error("[enquiry] send failed:", error);
    return Response.json(
      { error: error.message || "Could not send your enquiry. Please try again." },
      { status: 502 },
    );
  }
}
