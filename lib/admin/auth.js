import { createClient } from "@/lib/supabase/client";

let listeners = new Set();
let snapshot;
let started = false;
let supabase;

function emit() {
  listeners.forEach((listener) => listener());
}

function displayName(user) {
  return (
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "Admin"
  );
}

function mapUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    name: displayName(user),
  };
}

function ensureStarted() {
  if (started || typeof window === "undefined") return;
  started = true;
  supabase = createClient();
  supabase.auth.onAuthStateChange((_event, session) => {
    snapshot = mapUser(session?.user ?? null);
    emit();
  });
}

export function subscribeSession(listener) {
  listeners.add(listener);
  ensureStarted();
  return () => {
    listeners.delete(listener);
  };
}

export function getSessionSnapshot() {
  ensureStarted();
  return snapshot;
}

export function getSessionServerSnapshot() {
  return undefined;
}

export function isSessionReady(user) {
  return user !== undefined;
}

function authErrorMessage(error) {
  const message = error?.message || "";
  if (/invalid login credentials/i.test(message)) {
    return "Invalid email or password.";
  }
  if (/email not confirmed/i.test(message)) {
    return "This email is not confirmed yet. Confirm it in Supabase Auth, then try again.";
  }
  return message || "Unable to sign in.";
}

export async function loginWithCredentials(email, password) {
  ensureStarted();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  if (error) {
    return { ok: false, error: authErrorMessage(error) };
  }

  snapshot = mapUser(data.user);
  emit();
  return { ok: true, user: snapshot };
}

export async function clearSession() {
  ensureStarted();
  await supabase.auth.signOut();
  snapshot = null;
  emit();
}
