import {
  defineEventHandler,
  readBody,
  getHeaders,
  createError,
  getCookie,
  setCookie,
} from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const rawHeaders = getHeaders(event);

  // Ensure headers are a plain object with string values
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(rawHeaders["user-agent"]
      ? { "User-Agent": rawHeaders["user-agent"] }
      : {}),
    ...(rawHeaders["accept"] ? { Accept: rawHeaders["accept"] } : {}),
    ...(rawHeaders.authorization
      ? { Authorization: rawHeaders.authorization }
      : {}),
  };

  // Automatically inject HttpOnly cookie as Bearer token if present
  const authCookie = getCookie(event, "auth_token");
  if (authCookie && !headers["Authorization"]) {
    headers["Authorization"] = `Bearer ${authCookie}`;
  }

  try {
    const response: any = await $fetch(
      "https://elo--elo-backend--fwg2j6rrxrkh.code.run/api",
      {
        method: "POST",
        body,
        headers,
      },
    );

    // Securely extract the token and set the HttpOnly cookie
    if (response?.data?.login?.access_token) {
      setCookie(event, "auth_token", response.data.login.access_token, {
        httpOnly: true,
        secure: true, // Always secure
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      // Obfuscate token from the JS client to prevent XSS leakage
      response.data.login.access_token = "SECURE_HTTP_ONLY_COOKIE_SET";
    }

    return response;
  } catch (error: any) {
    // If the backend returned a response body with GraphQL errors, forward it
    // so the frontend can display specific error messages
    if (error?.response?._data) {
      return error.response._data;
    }
    throw createError({
      statusCode: error?.response?.status || 500,
      message: error?.message || "Bad Gateway",
    });
  }
});
