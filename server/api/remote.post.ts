import { defineEventHandler, readBody, getHeaders, createError } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const rawHeaders = getHeaders(event);
  // Ensure headers are a plain object with string values
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    // Forward User-Agent and Accept if present
    ...(rawHeaders["user-agent"]
      ? { "User-Agent": rawHeaders["user-agent"] }
      : {}),
    ...(rawHeaders["accept"] ? { Accept: rawHeaders["accept"] } : {}),
    ...(rawHeaders.authorization
      ? { Authorization: rawHeaders.authorization }
      : {}),
  };

  try {
    const response = await $fetch(
      "https://elo--elo-backend--fwg2j6rrxrkh.code.run/api",
      {
        method: "POST",
        body,
        headers,
      },
    );
    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error?.response?.status || 500,
      message: error?.message || "Bad Gateway",
    });
  }
});
