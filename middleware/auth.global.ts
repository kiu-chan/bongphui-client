// middleware/auth.global.ts
import { useAuthStore } from "~/store/auth";
import { checkRoutePermission } from "~/config/routes";

export default defineNuxtRouteMiddleware((to) => {
  // Chỉ chạy trên client
  if (process.server) return;
  
  const authStore = useAuthStore();
  
  // Khởi tạo auth nếu chưa có
  if (!authStore.user && authStore.token) {
    authStore.initAuth();
  }
  
  const userRole = authStore.userRole;
  const { allowed, redirectTo } = checkRoutePermission(to.path, userRole);
  
  if (!allowed && redirectTo) {
    return navigateTo(redirectTo);
  }
});