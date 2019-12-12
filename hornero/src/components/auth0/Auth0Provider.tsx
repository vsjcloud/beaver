import createAuth0Client from "@auth0/auth0-spa-js";
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import React from "react";
import {useHistory} from "react-router";

import {AppToaster} from "../toaster/AppToaster";

export type Auth0Context = {
  authenticated: boolean | undefined;
  token: string;
  loginWithRedirect(): void;
  handleRedirectCallback(): void;
  logout(): void;
}

export const Auth0Context = React.createContext<Auth0Context | undefined>(undefined);

export const useAuth0 = (): Auth0Context | undefined => React.useContext(Auth0Context);

export const Auth0Provider: React.FC<Auth0ClientOptions> = (props: React.PropsWithChildren<Auth0ClientOptions>) => {
  const [authenticated, setAuthenticated] = React.useState<boolean | undefined>(undefined);
  const [token, setToken] = React.useState("");
  const [client, setClient] = React.useState<Auth0Client>();
  const history = useHistory();

  React.useEffect(() => {
    (async (): Promise<void> => {
      const client = await createAuth0Client(props);
      setClient(client);
      const authenticated = await client.isAuthenticated();
      if (authenticated) {
        setToken(await client.getTokenSilently());
      }
      setAuthenticated(authenticated);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRedirectCallback = async (): Promise<void> => {
    try {
      await client?.handleRedirectCallback();
      setAuthenticated(true);
      setToken(await client?.getTokenSilently());
      history.replace("/");
    } catch {
      AppToaster.show({intent: Intent.DANGER, message: "Có lỗi xảy ra khi đăng nhập vào hệ thống"});
      await client?.logout();
    }
  };

  return (
    <Auth0Context.Provider
      value={{
        authenticated,
        token,
        loginWithRedirect: async (): Promise<void> => await client?.loginWithRedirect(),
        handleRedirectCallback,
        logout: async (): Promise<void> => await client?.logout(),
      }}
    >
      {props.children}
    </Auth0Context.Provider>
  );
};
