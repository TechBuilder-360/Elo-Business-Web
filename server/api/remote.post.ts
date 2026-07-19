import { getCookie, setCookie } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const headers = getHeaders(event);

  const reqHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers.authorization ? { Authorization: headers.authorization } : {}),
  };

  // Automatically inject HttpOnly cookie as Bearer token if present
  const authCookie = getCookie(event, "auth_token");
  if (authCookie && !reqHeaders.Authorization) {
    reqHeaders.Authorization = `Bearer ${authCookie}`;
  }

  try {
    const response: any = await $fetch(
      "https://elo--elo-backend--fwg2j6rrxrkh.code.run/api",
      {
        method: "POST",
        body,
        headers: reqHeaders,
      },
    );

    // Securely extract the token and set the HttpOnly cookie
    if (response?.data?.login?.access_token) {
      setCookie(event, "auth_token", response.data.login.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      // Obfuscate token from the JS client to prevent XSS leakage
      response.data.login.access_token = "SECURE_HTTP_ONLY_COOKIE_SET";
    }

    return response;
  } catch (error: any) {
    // If the backend returned a GraphQL error response, forward it cleanly
    if (error?.response?._data) {
      return error.response._data;
    }

    throw createError({
      statusCode: error.response?.status || 502,
      message: error.message || "Bad Gateway",
    });
  }
});
