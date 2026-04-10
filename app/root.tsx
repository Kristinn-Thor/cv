import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import type {Route} from './+types/root';
import './app.css';
import {ThemeProvider} from './components/themeContext';

export const links: Route.LinksFunction = () => [
  {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Saira:ital,wght@0,100..900;1,100..900&display=swap',
  },
];

export function Layout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* // This custom script runs before React hydration to set the initial theme class on the body */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function setThemeClass() {
                  try {
                    var theme = localStorage.getItem('theme');
                    var body = document.body;
                    if (!body) return;
                    if (theme === 'light' || theme === 'dark') {
                      body.classList.add(theme);
                    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                      body.classList.add('dark');
                    } else {
                      body.classList.add('light');
                    }
                  } catch (e) {
                    if (document.body) document.body.classList.add('dark');
                  }
                }
                if (document.body) {
                  setThemeClass();
                } else {
                  window.addEventListener('DOMContentLoaded', setThemeClass);
                }
              })();
            `,
          }}
        />
        <Meta />
        <Links />
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
  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  );
}

export function ErrorBoundary({error}: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="flex flex-col h-screen items-center justify-center">
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
