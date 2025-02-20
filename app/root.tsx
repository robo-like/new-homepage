import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "react-router";
import { useEffect } from "react";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];
export const loader = async () => {
  return { gaTrackingId: process.env.GA_TRACKING_ID }
};

// Generate a random session ID and store it in a cookie
function getOrCreateSessionId() {
  const existingSessionId = document.cookie.match(/sessionId=([^;]+)/)?.[1];
  if (existingSessionId) {
    return existingSessionId;
  }

  const newSessionId = Math.random().toString(36).substring(2, 15);
  // Set cookie to expire in 30 days
  document.cookie = `sessionId=${newSessionId};path=/;max-age=${60 * 60 * 24 * 30}`;
  return newSessionId;
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { gaTrackingId } = useLoaderData<typeof loader>();
  const location = useLocation();

  useEffect(() => {
    // Get existing or create new session ID
    const sessionId = getOrCreateSessionId();

    // Send page view data to metrics endpoint
    fetch('/api/metrics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        path: location.pathname,
      }),
    }).catch(error => {
      // Silently fail for analytics
      console.error('Error tracking page view:', error);
    });
  }, [location.pathname]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />

        {typeof document !== "undefined" && (
          <>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-QE23FJW74Y"></script>

            <script
              async
              id="gtag-init"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${gaTrackingId}', {
                  page_path: window.location.pathname,
                });
              `,
              }}
            />
          </>
        )}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
