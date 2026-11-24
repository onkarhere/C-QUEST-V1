import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { routeTree } from "./routeTree.gen";
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary";
import { NotFound } from "@/components/NotFound";
import { createQueryClient } from "@/lib/query-client";

// Vite's `base`. It is "/" in dev and in the Worker build, and "/C-QUEST-V1/" for the
// static GitHub Pages build, where the app is served from a subpath.
const basepath = import.meta.env.BASE_URL.replace(/\/$/, "");

export function getRouter() {
  const queryClient = createQueryClient();
  const router = createRouter({
    routeTree,
    basepath: basepath || "/",
    context: { queryClient },
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    scrollRestoration: true,
  });
  // Provides QueryClientProvider and ships queries fetched during SSR to the browser cache.
  setupRouterSsrQueryIntegration({ router, queryClient });
  return router;
}
