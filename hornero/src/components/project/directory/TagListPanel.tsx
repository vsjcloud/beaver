import {Button, NonIdealState} from "@blueprintjs/core";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import {IconNames} from "@blueprintjs/icons";
import * as jspb from "google-protobuf";
import {Empty} from "google-protobuf/google/protobuf/empty_pb";
import React from "react";

import {EditProjectTagDialog} from "./EditProjectTagDialog";
import {ProjectTagList} from "./ProjectTagList";
import {TabPanelLayout} from "./TabPanelLayout";

import {ProjectTag} from "../../../generated/proto/model/project_pb";
import {
  ArchiveProjectTagRequest,
  CreateProjectTagRequest,
  UpdateProjectTagRequest
} from "../../../generated/proto/rpc/project/project_pb";
import {useProjectClient} from "../../../services/project";
import * as Utils from "../../../utils";

export function TagListPanel(): React.ReactElement {
  const projectClient = useProjectClient();

  const [tags, setTags] = React.useState<jspb.Map<string, ProjectTag>>();

  const [isCreateProjectTagDialogOpen, setIsCreateProjectTagDialogOpen] = React.useState(false);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(function () {
    (async function (): Promise<void> {
      const tags = await async function (): Promise<jspb.Map<string, ProjectTag>> {
        const response = await projectClient.getProjectTags(new Empty());
        return response.getTagsMap();
      }();
      const archivedTagIDs = await async function (): Promise<jspb.Map<string, boolean> | undefined> {
        const response = await projectClient.getArchivedProjectTagDirectory(new Empty());
        return response.getArchivedprojecttagdirectory()?.getProjecttagidsMap();
      }();
      const activeTags = new jspb.Map<string, ProjectTag>([]);
      tags.forEach((tag, tagID) => {
        if (archivedTagIDs?.has(tagID)) return;
        activeTags.set(tagID, tag);
      });
      setTags(activeTags);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createNewTagButton = (
    <Button
      intent={Intent.PRIMARY}
      icon={IconNames.ADD}
      onClick={(): void => setIsCreateProjectTagDialogOpen(true)}
    >Tạo hạng mục mới</Button>
  );

  async function onCreateNewProjectTag(projectTag: ProjectTag): Promise<void> {
    const request = new CreateProjectTagRequest();
    request.setProjecttag(projectTag);
    const response = await projectClient.createProjectTag(request);
    const projectTagID = response.getProjecttagid();
    setTags(tags => tags?.set(projectTagID, projectTag));
  }

  async function onDeleteProjectTag(projectTagID: string): Promise<void> {
    const request = new ArchiveProjectTagRequest();
    request.setProjecttagid(projectTagID);
    await projectClient.archiveProjectTag(request);
    setTags(tags => {
      const clonedTags = Utils.pbMapClone(tags!);
      clonedTags.del(projectTagID);
      return clonedTags;
    });
  }

  async function onUpdateProjectTag(projectTagID: string, projectTag: ProjectTag): Promise<void> {
    const request = new UpdateProjectTagRequest();
    request.setProjecttagid(projectTagID);
    request.setProjecttag(projectTag);
    await projectClient.updateProjectTag(request);
    setTags(tags => {
      const clonedTags = Utils.pbMapClone(tags!);
      clonedTags.set(projectTagID, projectTag);
      return clonedTags;
    });
  }

  return (
    <TabPanelLayout loading={loading}>
      <div className="w-full">
        {tags?.getLength() === 0 ? (
          <NonIdealState
            icon={IconNames.TAG}
            title={"Không có hạng mục nào"}
            description={"Tạo hạng mục mới bằng cách nhấn vào nút bên dưới"}
            action={createNewTagButton}
          />
        ) : (
          <React.Fragment>
            <div className="flex justify-end mb-3">
              {createNewTagButton}
            </div>
            <ProjectTagList
              tags={tags!}
              onDeleteProjectTag={onDeleteProjectTag}
              onUpdateProjectTag={onUpdateProjectTag}
            />
          </React.Fragment>
        )}
      </div>
      <EditProjectTagDialog
        isOpen={isCreateProjectTagDialogOpen}
        onClose={(): void => setIsCreateProjectTagDialogOpen(false)}
        onSaveProjectTag={onCreateNewProjectTag}
      />
    </TabPanelLayout>
  );
}
