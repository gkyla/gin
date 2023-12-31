export default defineNuxtRouteMiddleware(async (to, from) => {
  const { getCurrentUser } = await useAuth();

  const user = await getCurrentUser();
  if (to.path.startsWith("/dashboard") && !user) {
    return navigateTo("/login");
  }
  if (to.path === "/login" && user) {
    return navigateTo("/dashboard/info");
  }
});
