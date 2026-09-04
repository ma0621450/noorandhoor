const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value) {
  return String(value || "").trim();
}

export function validateLeadFields(values) {
  const errors = {};
  const fullName = clean(values.fullName || values.name);
  const email = clean(values.email);
  const phone = clean(values.phone);
  const interest = clean(values.interest);
  const propertyType = clean(values.propertyType);
  const request = clean(values.request);

  if (!fullName || fullName.length < 2) {
    errors.fullName = "Enter your full name.";
  }
  if (!email || !EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!phone || phone.replace(/\D/g, "").length < 8) {
    errors.phone = "Enter a valid phone number.";
  }
  if (!interest) {
    errors.interest = "Select your property interest.";
  }
  if (!propertyType) {
    errors.propertyType = "Select a property type.";
  }
  if (!request) {
    errors.request = "Select a request type.";
  }

  const keys = Object.keys(errors);
  if (!keys.length) return { ok: true, errors: {} };

  return {
    ok: false,
    errors,
    message: errors[keys[0]],
  };
}

export function validateContactBasics(values) {
  const errors = {};
  const name = clean(values.name || values.fullName);
  const email = clean(values.email);
  const phone = clean(values.phone);
  const details = clean(values.details || values.brief || values.message);

  if (!name || name.length < 2) {
    errors.name = "Enter your full name.";
  }
  if (!email || !EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!phone || phone.replace(/\D/g, "").length < 8) {
    errors.phone = "Enter a valid phone number.";
  }
  if (!details || details.length < 10) {
    errors.details = "Please share a few more details (at least 10 characters).";
  }

  const keys = Object.keys(errors);
  if (!keys.length) return { ok: true, errors: {} };

  return {
    ok: false,
    errors,
    message: errors[keys[0]],
  };
}

export function validateSellMatching(values) {
  const errors = {};
  const name = clean(values.name);
  const email = clean(values.email);
  const phone = clean(values.phone);
  const brief = clean(values.brief);
  const timeline = clean(values.timeline);
  const occupancy = clean(values.occupancy);

  if (!brief || brief.length < 10) {
    errors.brief = "Describe your property (at least 10 characters).";
  }
  if (!timeline) {
    errors.timeline = "Select a timeline.";
  }
  if (!occupancy) {
    errors.occupancy = "Select occupancy status.";
  }
  if (!name || name.length < 2) {
    errors.name = "Enter your full name.";
  }
  if (!email || !EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!phone || phone.replace(/\D/g, "").length < 8) {
    errors.phone = "Enter a valid phone number.";
  }

  const keys = Object.keys(errors);
  if (!keys.length) return { ok: true, errors: {} };

  return {
    ok: false,
    errors,
    message: errors[keys[0]],
  };
}
