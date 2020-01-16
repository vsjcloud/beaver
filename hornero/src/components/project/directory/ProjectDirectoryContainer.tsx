import {Tab, Tabs} from "@blueprintjs/core";
import React from "react";

import {ProjectListPanel} from "./ProjectListPanel";
import {TagListPanel} from "./TagListPanel";

import {BaseLayout} from "../../layout/BaseLayout";

export function ProjectDirectoryContainer(): React.ReactElement {
  return (
    <BaseLayout>
      <Tabs id="ProjectDirectory" vertical={true}>
        <Tab
          id="ProjectList"
          title="Dự án"
          className="w-full"
          panel={<ProjectListPanel/>}
        />
        <Tab
          id="TagList"
          title="Hạng mục"
          className="w-full"
          panel={<TagListPanel/>}
        />
        <div style={{width: "200px"}}/>
      </Tabs>
    </BaseLayout>
  );
}
