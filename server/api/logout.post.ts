import { defineEventHandler, deleteCookie } from "h3";

export default defineEventHandler((event) => {
  deleteCookie(event, "auth_token", {
    path: "/",
  });
  deleteCookie(event, "auth_status", {
    path: "/",
  });
  
  return { success: true };
});
