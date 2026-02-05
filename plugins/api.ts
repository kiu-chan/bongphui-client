// plugins/api.ts
import { defineNuxtPlugin, useRuntimeConfig, navigateTo } from "#app";
import { ofetch } from "ofetch";
import type { ApiInstance } from "~/types/api";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const baseFetch = ofetch.create({
    baseURL: config.public.apiBase as string,
    credentials: "include",
    async onRequest({ options }) {
      // Tự động thêm token vào mọi request
      if (process.client) {
        const token = localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");
        if (token) {
          options.headers = new Headers(options.headers as HeadersInit);
          options.headers.set("Authorization", `Bearer ${token}`);
        }
      }
    },
    async onResponseError({ response }) {
      // Xử lý khi gặp lỗi 401 (Unauthorized) hoặc 403 (Forbidden)
      if ((response.status === 401 || response.status === 403) && process.client) {
        const token = localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");
        
        // Chỉ hiển thị popup nếu không có token hoặc token rỗng
        if (!token || token.trim() === "") {
          const confirmed = confirm("Bạn cần đăng nhập để tiếp tục. Chuyển đến trang đăng nhập?");
          if (confirmed) {
            await navigateTo("/login");
          }
        }
      }
    },
  });

  const api: ApiInstance = {
    get: (url, options = {}) => baseFetch(url, { method: "GET", ...options }),
    post: (url, body, options = {}) =>
      baseFetch(url, { method: "POST", body, ...options }),
    put: (url, body, options = {}) =>
      baseFetch(url, { method: "PUT", body, ...options }),
    delete: (url, options = {}) =>
      baseFetch(url, { method: "DELETE", ...options }),
  };

  return {
    provide: {
      api,
    },
  };
});