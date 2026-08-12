export default defineNuxtRouteMiddleware(async (to) => {
  // Public routes that don't require authentication
  const publicRoutes = ["/", "/signup", "/verify-otp"];

  if (publicRoutes.includes(to.path)) {
    return;
  }

  // Check auth status synchronously via the client-readable dummy cookie
  const authStatus = useCookie("auth_status");
  
  if (authStatus.value !== "logged_in") {
    return navigateTo("/");
  }
});
