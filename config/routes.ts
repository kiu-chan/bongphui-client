// config/routes.ts
export type UserRole = 'ADMIN' | 'USER' | 'GUEST';

export interface RouteConfig {
  path: string;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

export const routePermissions: RouteConfig[] = [
  // Trang công khai (GUEST có thể truy cập)
  { path: '/', allowedRoles: ['GUEST', 'USER', 'ADMIN'] },
  { path: '/giaidau', allowedRoles: ['GUEST', 'USER', 'ADMIN'] },
  { path: '/doibong', allowedRoles: ['GUEST', 'USER', 'ADMIN'] },
  { path: '/lienhe', allowedRoles: ['GUEST', 'USER', 'ADMIN'] },
  { path: '/login', allowedRoles: ['GUEST', 'USER', 'ADMIN'] },
  { path: '/register', allowedRoles: ['GUEST', 'USER', 'ADMIN'] },
  
  // Trang yêu cầu đăng nhập (USER và ADMIN)
  { path: '/profile', allowedRoles: ['USER', 'ADMIN'], redirectTo: '/login' },
  { path: '/quanlygiaidau', allowedRoles: ['USER', 'ADMIN'], redirectTo: '/login' },
  
  // Trang chỉ ADMIN
  { path: '/admin', allowedRoles: ['ADMIN'], redirectTo: '/' },
  { path: '/admin/*', allowedRoles: ['ADMIN'], redirectTo: '/' },
];

export function checkRoutePermission(path: string, userRole: UserRole): { allowed: boolean; redirectTo?: string } {
  // Tìm route config phù hợp nhất
  let matchedRoute: RouteConfig | undefined;
  
  for (const route of routePermissions) {
    if (route.path.endsWith('/*')) {
      // Wildcard route
      const basePath = route.path.slice(0, -2);
      if (path.startsWith(basePath)) {
        matchedRoute = route;
        break;
      }
    } else if (route.path === path) {
      // Exact match
      matchedRoute = route;
      break;
    }
  }
  
  // Nếu không tìm thấy route config, cho phép truy cập
  if (!matchedRoute) {
    return { allowed: true };
  }
  
  // Kiểm tra quyền
  const allowed = matchedRoute.allowedRoles.includes(userRole);
  
  return {
    allowed,
    redirectTo: allowed ? undefined : matchedRoute.redirectTo,
  };
}