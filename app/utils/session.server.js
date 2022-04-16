import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { getSessionToken, signOutFirebase, adminAuth } from "~/utils/db.server";

require("dotenv").config();

const storage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === "production",
    secrets: ["sessionSecret"],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export async function createUserSession(idToken, redirectTo) {
  const token = await getSessionToken(idToken);
  const session = await storage.getSession();
  session.set("token", token);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export async function getUserSession(request) {
  const cookieSession = await storage.getSession(request.headers.get("Cookie"));
  const token = cookieSession.get("token");
  if (!token) return null;

  try {
    const tokenUser = await adminAuth.verifySessionCookie(token, true);
    return tokenUser;
  } catch (error) {
    return null;
  }
}

export async function destroySession(request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const newCookie = await storage.destroySession(session);

  return redirect("/login", { headers: { "Set-Cookie": newCookie } });
}

// NUevo
export async function signOut(request) {
  await signOutFirebase();
  return await destroySession(request);
}

export async function getSession(request) {
  const cookieSession = await storage.getSession(request.headers.get("Cookie"));
  const token = cookieSession.get("token");
  if (!token) return null;
  return token;
}
