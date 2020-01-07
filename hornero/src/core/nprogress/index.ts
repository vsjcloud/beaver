import nProgress from "nprogress";
import React from "react";

export function useNProgress(): () => void {
  const [isDone, setIsDone] = React.useState(false);

  React.useEffect(function () {
    if (!isDone) {
      nProgress.start();
    } else {
      nProgress.done();
    }
  }, [isDone]);

  return (): void => setIsDone(true);
}
