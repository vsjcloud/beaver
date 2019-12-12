import {Spinner} from "@blueprintjs/core";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import React from "react";

import {useAuth0} from "./Auth0Provider";

export const Auth0Callback: React.FC = () => {
  const {authenticated, handleRedirectCallback} = useAuth0()!;

  React.useEffect(() => {
    if (authenticated === undefined || authenticated) {
      return;
    }
    (async (): Promise<void> => {
      await handleRedirectCallback();
    })();
  }, [authenticated, handleRedirectCallback]);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Spinner intent={Intent.PRIMARY}/>
    </div>
  )
};
