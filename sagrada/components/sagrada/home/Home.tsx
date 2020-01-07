import React from "react";

import {Hero} from "./hero/Hero";
import {Onboarding} from "./onboarding/Onboarding";

import {BaseLayout} from "../layout/BaseLayout";

export function Home(): React.ReactElement {
  return (
    <BaseLayout>
      <Hero className="mt-4"/>
      <Onboarding className="my-12"/>
    </BaseLayout>
  );
}
