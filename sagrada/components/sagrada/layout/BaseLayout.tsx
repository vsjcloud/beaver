import Head from "next/head";
import React from "react";

import "./_baseLayout.scss";
import {Footer} from "./footer/Footer";
import {Navbar} from "./navbar/Navbar";

export type BaseLayoutProps = React.PropsWithChildren<{}>;

export function BaseLayout({
  children,
}: BaseLayoutProps): React.ReactElement {
  return (
    <React.Fragment>
      <Head>
        <title>VSJ</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" href="https://use.typekit.net/dva7qht.css"/>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Vollkorn:400,600,700&display=swap&subset=vietnamese"
        />
      </Head>
      <div className="font-body">
        <Navbar className="p-4"/>
        <div className="px-4 min-h-screen">
          <div className="container mx-auto">
            {children}
          </div>
        </div>
        <Footer className="px-4 py-12"/>
      </div>
    </React.Fragment>
  );
}
