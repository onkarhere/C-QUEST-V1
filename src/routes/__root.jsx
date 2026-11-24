import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary";
import { NotFound } from "@/components/NotFound";
import { Toaster } from "@/components/ui/sonner";
import { GameProvider } from "@/lib/game/GameProvider";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
import appCss from "@/index.css?url";

export const Route = createRootRoute({
  // Per-page <title>/meta come from each route's head(); this is the shared base.
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "C//QUEST — Learn C as an Adventure" },
      {
        name: "description",
        content:
          "A premium browser game that takes you from absolute beginner to advanced C programmer through worlds, missions and coding boss fights.",
      },
      { name: "theme-color", content: "#0E1418", media: "(prefers-color-scheme: dark)" },
      { name: "theme-color", content: "#F7F7F7", media: "(prefers-color-scheme: light)" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Nunito:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider>
      <GameProvider>
        <Outlet />
        <Toaster />
      </GameProvider>
    </ThemeProvider>
  );
}

// The document. There is no index.html: the server renders <html> from here.
function RootDocument({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        {/* Applies the saved theme before the first paint, so dark mode never flashes. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var k='cquest.theme',v=localStorage.getItem(k),d=v!=='light';document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();",
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
