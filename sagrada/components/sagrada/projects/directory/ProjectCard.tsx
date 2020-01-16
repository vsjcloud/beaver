import classNames from "classnames";
import React from "react";

import {ProjectTagList} from "../ProjectTagList";

import {ProjectTag} from "../../../../common/generated/proto/model/project_pb";
import {AnchorLink} from "../../../core/link/AnchorLink";

export type ProjectCardInfo = {
  projectID: string;
  name: string;
  description: string;
  tags: Map<string, ProjectTag.AsObject>;
  preview: string;
  previewSet: string;
};

export type ProjectCardProps = {
  info: ProjectCardInfo;
  className?: string;
};

export function ProjectCard({info, className}: ProjectCardProps): React.ReactElement {
  return (
    // TODO: hack onboarding-card
    <div className={classNames(className, "flex")}>
      <div className="onboarding-card flex-col rounded text-dark-gray-4">
        <AnchorLink to="/project/[projectID]" as={`/project/${info.projectID}`}>
          <img className="w-full rounded-t h-64 object-cover" src={info.preview} srcSet={info.previewSet}
            alt={info.name}/>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3">{info.name}</h3>
            <ProjectTagList tags={info.tags}/>
            <div className="project-card-description">{info.description}</div>
          </div>
        </AnchorLink>
      </div>
    </div>
  );
}

