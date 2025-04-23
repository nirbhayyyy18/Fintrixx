import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: ["/", "/api/webhook"],
  // Routes that can be accessed while signed out
  ignoredRoutes: ["/api/webhook", "/favicon.ico", "/((?!api|trpc))(_next|.+\\.[\\w]+$)"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 