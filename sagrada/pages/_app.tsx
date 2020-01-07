import {NextPage} from "next";
import {AppProps} from "next/app";
import NProgress from "nextjs-progressbar";
import React from "react";

const SagradaApp: NextPage<AppProps> = ({Component, pageProps}: AppProps) => {
  return (
    <React.Fragment>
      <NProgress
        color="#2B95D6"
        options={{
          showSpinner: false,
        }}
      />
      <Component {...pageProps}/>
    </React.Fragment>
  );
};

export default SagradaApp;
