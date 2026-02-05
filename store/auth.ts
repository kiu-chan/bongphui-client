// store/auth.ts
import { defineStore } from "pinia";
import { decodeJWT, isTokenExpired, type JwtPayload } from "~/utils/jwt";
import type { UserRole } from "~/config/routes";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: (process.client && (localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token"))) || null,
    user: null as null | JwtPayload,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user && !isTokenExpired(state.user),
    userRole: (state): UserRole => {
      if (!state.user) return 'GUEST';
      return state.user.role as UserRole;
    },
    userId: (state) => state.user?.id || null,
    username: (state) => state.user?.sub || null,
  },
  actions: {
    setToken(token: string | null, persist: boolean = true) {
      this.token = token;
      
      // Giải mã JWT để lấy thông tin user
      if (token) {
        const decoded = decodeJWT(token);
        if (decoded && !isTokenExpired(decoded)) {
          this.user = decoded;
        } else {
          this.user = null;
          token = null;
        }
      } else {
        this.user = null;
      }
      
      try {
        if (process.client) {
          if (token) {
            if (persist) {
              localStorage.setItem("auth_token", token);
              sessionStorage.removeItem("auth_token");
            } else {
              sessionStorage.setItem("auth_token", token);
              localStorage.removeItem("auth_token");
            }
          } else {
            localStorage.removeItem("auth_token");
            sessionStorage.removeItem("auth_token");
          }
        }
      } catch (e) {
        console.warn("setToken storage error", e);
      }
    },

    async login(username: string, password: string, remember: boolean = true) {
      const { $api } = useNuxtApp();
      try {
        const payload = { username, password };
        const res: any = await $api.post("/auth/login", payload);

        let token: string | null = null;
        if (res == null) token = null;
        else if (typeof res === "string") token = res;
        else if (typeof res === "object") {
          token = res.data?.token ?? res.token ?? null;
        }

        if (!token) {
          throw new Error("Không nhận được token từ server.");
        }

        this.setToken(token, remember);

        return token;
      } catch (err: any) {
        let message = "Đăng nhập thất bại.";
        if (err?.response?.data?.message) message = err.response.data.message;
        else if (err?.message) message = err.message;
        throw new Error(message);
      }
    },

    async register(username: string, password: string, role: string = "user") {
      const { $api } = useNuxtApp();
      try {
        const payload = { username, password, role };
        const res: any = await $api.post("/auth/register", payload);
        const data = res?.data ?? res;
        return data;
      } catch (err: any) {
        let message = "Đăng ký thất bại.";
        if (err?.response?.data?.message) message = err.response.data.message;
        else if (err?.message) message = err.message;
        throw new Error(message);
      }
    },

    logout() {
      this.setToken(null, true);
      this.user = null;
    },

    initAuth() {
      if (process.client) {
        const token = localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");
        if (token) {
          this.setToken(token, !!localStorage.getItem("auth_token"));
        }
      }
    },
  },
});