export default defineNuxtRouteMiddleware(async (to) => {
  // Public routes that don't require authentication
  const publicRoutes = ["/", "/signup", "/verify-otp"];

  if (publicRoutes.includes(to.path)) {
    return;
  }

  // Check auth status via server endpoint (reads HttpOnly cookie)
  try {
    const headers = useRequestHeaders(["cookie"]);
    const { authenticated } = await $fetch("/api/auth-check", { headers });
    if (!authenticated) {
      return navigateTo("/");
    }
  } catch {
    return navigateTo("/");
  }
});
