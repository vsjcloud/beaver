import {Spinner} from "@blueprintjs/core";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import React from "react";

export type TabPanelLayoutProps = React.PropsWithChildren<{
  loading?: boolean;
}>;

export function TabPanelLayout({
  loading = false,
  children,
}: TabPanelLayoutProps): React.ReactElement {
  return (
    <div
      className="flex justify-center"
      style={{
        minHeight: "calc(100vh - 50px - 2rem)",
      }}
    >
      {loading ? (
        <Spinner intent={Intent.PRIMARY}/>
      ) : (
        <React.Fragment>
          {children}
        </React.Fragment>
      )}
    </div>
  );
}
