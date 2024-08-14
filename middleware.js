import { authMiddleware } from "@clerk/nextjs";

// This middleware configuration makes /api/webhook and /api/post public routes
export default authMiddleware({
  publicRoutes: ["/api/webhook", "/api/post","/api"],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
