export default defineNuxtRouteMiddleware(async (to) => {
  // Public routes that don't require authentication
  const publicRoutes = ["/", "/signup", "/verify-otp"];

  if (publicRoutes.includes(to.path)) {
    return;
  }

  // Check auth status via the server-side endpoint which correctly
  // reads the HttpOnly auth_token cookie (not accessible to JS directly)
  try {
    const fetcher = import.meta.server ? useRequestFetch() : $fetch;
    const { authenticated } = await fetcher("/api/auth-check");
    if (!authenticated) {
      return navigateTo("/");
    }
  } catch {
    return navigateTo("/");
  }
});
