import React from "react";
import classNames from "classnames";

import {ProjectTag} from "../../../common/generated/proto/model/project_pb";
import * as Utils from "../../../common/utils/utils";

export type ProjectCardTagListProps = {
  tags: Map<string, ProjectTag.AsObject>;
  className?: string;
};

export function ProjectTagList({tags, className}: ProjectCardTagListProps): React.ReactElement {
  if (tags.size === 0) {
    return null;
  }
  const tagNodes = Utils.mapEntry(tags,(tag, tagID) => (
    <ProjectTagItem
      tag={[tagID, tag]}
      key={tagID}
    />
  ));
  return (
    <div className={classNames(className, "flex flex-wrap items-center text-sm")}>
      {tagNodes}
    </div>
  )
}

type ProjectCardTagProps = {
  tag: [string, ProjectTag.AsObject];
  className?: string;
};

function ProjectTagItem({tag, className}: ProjectCardTagProps): React.ReactElement {
  return (
    <span className={classNames(className, "rounded-full mr-2 mb-2 px-3 py-1 text-white bg-blue-4")}>
      {tag[1].name}
    </span>
  )
}
