import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: (process.client && (localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token"))) || null,
    user: null as null | Record<string, any>,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setToken(token: string | null, persist: boolean = true) {
      this.token = token;
      try {
        if (process.client) {
          if (persist) {
            localStorage.setItem("auth_token", token ?? "");
            sessionStorage.removeItem("auth_token");
          } else {
            sessionStorage.setItem("auth_token", token ?? "");
            localStorage.removeItem("auth_token");
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