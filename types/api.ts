export interface ApiInstance {
  get: (url: string, options?: any) => Promise<any>
  post: (url: string, body?: any, options?: any) => Promise<any>
  put: (url: string, body?: any, options?: any) => Promise<any>
  delete: (url: string, options?: any) => Promise<any>
}

declare module '#app' {
  interface NuxtApp {
    $api: ApiInstance
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: ApiInstance
  }
}
