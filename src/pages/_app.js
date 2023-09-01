import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import { AppProvider } from "../context.jsx";

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default appWithTranslation(App);
