// root.tsx
import React, { useContext, useEffect, useState } from "react";
import { withEmotionCache } from "@emotion/react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import { VersionNav } from "./src/components/Navigation_Bar";
import { ServerStyleContext, ClientStyleContext } from "./context";
import theme from "./src/theme";
import { getSession, getUserSession, signOut } from "./utils/session.server";
import { getCurrentUser } from "./utils/db.server";
export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const loader = async ({ request }) => {
  const userSession = await getUserSession(request);
  if (userSession == null) {
    return false;
  }
  return userSession;
};

export let links = () => {
  return [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstaticom" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap",
    },
  ];
};

const Document = withEmotionCache(({ children }, emotionCache) => {
  const serverStyleData = useContext(ServerStyleContext);
  const clientStyleData = useContext(ClientStyleContext);

  // Only executed on client
  useEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head;
    // re-inject tags
    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush();
    tags.forEach((tag) => {
      emotionCache.sheet._insertTag(tag);
    });
    // reset cache to reapply global styles
    clientStyleData?.reset();
  }, []);

  const userSession = useLoaderData();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {serverStyleData?.map(({ key, ids, css }) => (
          <style
            key={key}
            data-emotion={`${key} ${ids.join(" ")}`}
            dangerouslySetInnerHTML={{ __html: css }}
          />
        ))}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
});
export default function App() {
  const [usuario, setUsuario] = useState(null);

  let people = useLoaderData();
  // Podemos hacer que si detecta que hay una sesi??n, podemos guardar el usuario con getUserSessionToken
  return (
    <Document>
      <ChakraProvider theme={theme}>
        <VersionNav contexto={people}>
          <>
            <Outlet />
          </>
        </VersionNav>
      </ChakraProvider>
    </Document>
  );
}
