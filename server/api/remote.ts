export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const headers = getHeaders(event);
  
  try {
    const response = await $fetch('https://elo--elo-backend--fwg2j6rrxrkh.code.run/api', {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
        ...(headers.authorization ? { Authorization: headers.authorization } : {})
      }
    });
    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.response?.status || 502,
      message: error.message || "Bad Gateway"
    });
  }
});
