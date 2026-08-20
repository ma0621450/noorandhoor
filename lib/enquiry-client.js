const FORM_SUBMIT_TO =
  process.env.NEXT_PUBLIC_LEAD_EMAIL || "jamshaid13579@gmail.com";

export function formValues(form) {
  const data = new FormData(form);
  return Object.fromEntries(data.entries());
}

async function submitViaFormSubmit(payload) {
  const name = payload.name || payload.fullName || "website";
  const subject =
    payload.source === "contact-page"
      ? `New contact form enquiry from ${name}`
      : `New enquiry from ${name}`;

  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(FORM_SUBMIT_TO)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: subject,
        _template: "table",
        _captcha: "false",
        name,
        email: payload.email,
        phone: payload.phone,
        company: payload.company,
        service: payload.service,
        source: payload.source,
        details: payload.details || payload.brief || payload.message,
      }),
    },
  );

  const data = await response.json().catch(() => ({}));
  const message = String(data.message || "");

  if (/activat/i.test(message)) {
    throw new Error(
      "Check inbox and Spam for a FormSubmit email, click Activate Form, then submit again.",
    );
  }

  if (!response.ok || data.success === false || data.success === "false") {
    throw new Error(data.message || "Could not send your enquiry. Please try again.");
  }
}

export async function submitEnquiry(payload) {
  const response = await fetch("/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Something went wrong. Please try again.");
  }

  if (data.fallback === "formsubmit") {
    await submitViaFormSubmit(payload);
  }

  return data;
}
