import createAuth0Client from "@auth0/auth0-spa-js";
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import React from "react";
import {useHistory} from "react-router";

import {AppToaster} from "../toaster/AppToaster";

export type Auth0Context = {
  checked: boolean;
  authenticated: boolean;
  token: string;
  loginWithRedirect(): void;
  handleRedirectCallback(): void;
  logout(): void;
}

export const Auth0Context = React.createContext<Auth0Context>({
  checked: false,
  authenticated: false,
  token: "",
  loginWithRedirect: () => {},
  handleRedirectCallback: () => {},
  logout: () => {},
});

export const useAuth0 = (): Auth0Context => React.useContext(Auth0Context);

export const Auth0Provider: React.FC<Auth0ClientOptions> = (props: React.PropsWithChildren<Auth0ClientOptions>) => {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [token, setToken] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const [client, setClient] = React.useState<Auth0Client>();
  const history = useHistory();

  React.useEffect(() => {
    (async (): Promise<void> => {
      const client = await createAuth0Client(props);
      setClient(client);
      const authenticated = await client.isAuthenticated();
      setAuthenticated(authenticated);
      if (authenticated) {
        setToken(await client.getTokenSilently());
      }
      setChecked(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRedirectCallback = async (): Promise<void> => {
    try {
      await client?.handleRedirectCallback();
      setAuthenticated(true);
      setToken(await client?.getTokenSilently());
      setChecked(true);
      history.replace("/");
    } catch {
      AppToaster.show({intent: Intent.DANGER, message: "Có lỗi xảy ra khi đăng nhập vào hệ thống"});
      await client?.logout();
    }
  };

  return (
    <Auth0Context.Provider
      value={{
        checked,
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
