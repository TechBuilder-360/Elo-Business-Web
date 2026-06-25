export default defineNuxtRouteMiddleware(async (to) => {
  // Public routes that don't require authentication
  const publicRoutes = ["/", "/signup", "/verify-otp"];

  if (publicRoutes.includes(to.path)) {
    return;
  }

  // Check auth status directly from the standard cookie
  const token = useCookie("access_token").value;
  if (!token) {
    return navigateTo("/");
  }
});
