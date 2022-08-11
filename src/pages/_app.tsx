import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ConfiguredApolloProvider } from "@/graphql/apollo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfiguredApolloProvider>
      <Component {...pageProps} />
    </ConfiguredApolloProvider>
  );
}

export default MyApp;
