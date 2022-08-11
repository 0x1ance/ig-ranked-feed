import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  NormalizedCacheObject,
} from "@apollo/client";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";
import { typePolicies } from "./typePolicies";


type ConfiguredApolloClientContextProps = {
  client: ApolloClient<NormalizedCacheObject>;
};
const ConfiguredApolloClientContext =
  createContext<ConfiguredApolloClientContextProps>({
    client: undefined,
  });

const ConfiguredApolloClientContextProvider = ({ children }) => {
  const link = useMemo(
    () =>
      new HttpLink({
        uri: "/api/graphql",
        credentials: "same-origin",
      }),
    []
  );
  const client = useMemo(
    () =>
      new ApolloClient({
        link,
        cache: new InMemoryCache({ typePolicies }),
      }),
    [link]
  );

  return (
    <ConfiguredApolloClientContext.Provider value={{ client }}>
      {children}
    </ConfiguredApolloClientContext.Provider>
  );
};

export const useConfiguredApolloClientContext = () =>
  useContext(ConfiguredApolloClientContext);

const ApolloProviderWrapper = ({ children }) => {
  const { client } = useConfiguredApolloClientContext();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export const ConfiguredApolloProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <ConfiguredApolloClientContextProvider>
      <ApolloProviderWrapper>{children}</ApolloProviderWrapper>
    </ConfiguredApolloClientContextProvider>
  );
};
