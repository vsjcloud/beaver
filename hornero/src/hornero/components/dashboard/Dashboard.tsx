import React from "react";

import {BaseLayout} from "../layout/BaseLayout";
import ProjectBuilder from "../projectbuilder/ProjectBuilder";

export const Dashboard: React.FC = () => {
  return (
    <BaseLayout>
      <ProjectBuilder/>
    </BaseLayout>
  );
};
