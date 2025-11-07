// plugins/api.ts
import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { ofetch } from 'ofetch'
import type { ApiInstance } from '~/types/api'

export default defineNuxtPlugin(() => {
const config = useRuntimeConfig()

const baseFetch = ofetch.create({
baseURL: config.public.apiBase as string,
credentials: 'include', // Gửi cookie/session đến backend
headers: {
'Content-Type': 'application/json', // Đảm bảo định dạng gửi là JSON
},
})

const api: ApiInstance = {
get: (url, options = {}) => baseFetch(url, { method: 'GET', ...options }),
post: (url, body, options = {}) => baseFetch(url, { method: 'POST', body, ...options }),
put: (url, body, options = {}) => baseFetch(url, { method: 'PUT', body, ...options }),
delete: (url, options = {}) => baseFetch(url, { method: 'DELETE', ...options }),
}

return {
provide: {
api,
},
}
})