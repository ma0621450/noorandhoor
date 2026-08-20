import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD = 4000;

function cleanLine(value, max = MAX_FIELD) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function cleanMultiline(value, max = MAX_FIELD) {
  return String(value || "")
    .replace(/\r\n/g, "\n")
    .trim()
    .slice(0, max);
}

export function getLeadToEmail() {
  return cleanLine(process.env.LEAD_TO_EMAIL || "jamshaid13579@gmail.com", 320);
}

export function parseEnquiry(body) {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request." };
  }

  const honeypot = cleanLine(body.botcheck || body.website);
  if (honeypot && honeypot !== "false") {
    return { ok: true, spam: true };
  }

  const name = cleanLine(body.name || body.fullName, 200);
  const email = cleanLine(body.email, 320);
  const phone = cleanLine(body.phone, 80);
  const contact = cleanLine([email, phone].filter(Boolean).join(" / "), 400);
  const company = cleanLine(body.company, 200);
  const service = cleanLine(body.service, 120);
  const details = cleanMultiline(body.details || body.brief || body.message);
  const source = cleanLine(body.source, 80) || "website";

  if (!name) return { ok: false, error: "Please enter your name." };
  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (!phone) return { ok: false, error: "Please enter your phone number." };
  if (!details) return { ok: false, error: "Please share your details." };

  return {
    ok: true,
    data: {
      name,
      email,
      phone,
      contact,
      company,
      service,
      details,
      brief: details,
      message: details,
      source,
    },
  };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label, value) {
  if (!value) return "";
  return `<tr>
    <td style="padding:8px 12px;color:#9E9070;vertical-align:top;width:160px;">${escapeHtml(label)}</td>
    <td style="padding:8px 12px;color:#111;white-space:pre-wrap;">${escapeHtml(value)}</td>
  </tr>`;
}

function buildHtml(data) {
  return `
    <div style="font-family:Arial,sans-serif;background:#111;padding:24px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;">
        <tr>
          <td style="background:linear-gradient(90deg,#bc8741,#d6a85e);padding:18px 24px;color:#fff;font-size:18px;font-weight:700;">
            New website enquiry
          </td>
        </tr>
        <tr>
          <td style="padding:8px 12px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${row("Name", data.name)}
              ${row("Email", data.email)}
              ${row("Phone", data.phone)}
              ${row("Company", data.company)}
              ${row("Service", data.service)}
              ${row("Source", data.source)}
              ${row("Details", data.details)}
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
}

function buildText(data) {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    data.company && `Company: ${data.company}`,
    data.service && `Service: ${data.service}`,
    `Source: ${data.source}`,
    "",
    "Details:",
    data.details,
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendWithGmail(to, data) {
  const user = cleanLine(process.env.GMAIL_USER || "", 320);
  const pass = String(process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, "");
  if (!user || !pass) return false;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Noor and Hoor" <${user}>`,
    to,
    replyTo: data.email,
    subject: `New enquiry from ${data.name}`,
    text: buildText(data),
    html: buildHtml(data),
  });

  return true;
}

async function sendWithResend(to, data) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const from =
    process.env.LEAD_FROM_EMAIL || "Noor and Hoor <beth.t@example.com>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `New enquiry from ${data.name}`,
      html: buildHtml(data),
    }),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message || "Resend could not send the email.");
  }

  return true;
}

async function sendWithWeb3Forms(to, data) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) return false;

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `New enquiry from ${data.name}`,
      from_name: "Noor and Hoor Website",
      email: data.email,
      name: data.name,
      phone: data.phone,
      company: data.company,
      service: data.service,
      source: data.source,
      message: data.details,
      to,
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.success === false) {
    throw new Error(payload.message || "Web3Forms could not send the email.");
  }

  return true;
}

export async function sendEnquiryEmail(data) {
  const to = getLeadToEmail();
  if (!EMAIL_RE.test(to)) {
    throw new Error("LEAD_TO_EMAIL is not a valid email address.");
  }

  if (await sendWithGmail(to, data)) return true;
  if (await sendWithResend(to, data)) return true;
  if (await sendWithWeb3Forms(to, data)) return true;
  return false;
}
