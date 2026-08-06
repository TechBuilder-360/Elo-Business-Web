 import { getCookie, setCookie } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const headers = getHeaders(event);

  const reqHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(headers.authorization ? { Authorization: headers.authorization } : {}),
  };

  // Forward the active business context header if present
  const businessId = headers["x-business-id"];
  if (businessId) {
    reqHeaders["x-business-id"] = businessId;
  }

  // Automatically inject HttpOnly cookie as Bearer token if present
  const authCookie = getCookie(event, "auth_token");
  if (authCookie && !reqHeaders.Authorization) {
    reqHeaders.Authorization = `Bearer ${authCookie}`;
  }

  try {
    const config = useRuntimeConfig();
    const backendUrl = `${config.backendUrl}/api`;

    const response: any = await $fetch(backendUrl, {
      method: "POST",
      body,
      headers: reqHeaders,
    });

    // Securely extract the token and set the HttpOnly cookie
    if (response?.data?.login?.access_token) {
      const cookieOptions: any = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      };

      if (response.data.login.expire_at) {
        cookieOptions.expires = new Date(response.data.login.expire_at);
      } else {
        cookieOptions.maxAge = 60 * 60 * 24 * 7; // 7 days fallback
      }

      setCookie(
        event,
        "auth_token",
        response.data.login.access_token,
        cookieOptions,
      );

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
