import {Button, Classes, Popover} from "@blueprintjs/core";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import {IconNames} from "@blueprintjs/icons";
import classNames from "classnames";
import * as jspb from "google-protobuf";
import React from "react";

import {EditProjectTagDialog} from "./EditProjectTagDialog";

import {ProjectTag} from "../../../generated/proto/model/project_pb";
import * as Utils from "../../../utils";
import {AppToaster} from "../../toaster/AppToaster";



export type ProjectTagListProps = {
  tags: jspb.Map<string, ProjectTag>;
  onDeleteProjectTag(projectTagID: string): Promise<void>;
  onUpdateProjectTag(projectTagID: string, projectTag: ProjectTag): Promise<void>;
};

export function ProjectTagList({
  tags,
  onDeleteProjectTag,
  onUpdateProjectTag,
}: ProjectTagListProps): React.ReactElement {
  const tagItems = Utils.pbMapTransform(tags, (tag, tagID) => {
    async function onDelete(): Promise<void> {
      try {
        await onDeleteProjectTag(tagID);
      } catch {
        AppToaster.show({
          intent: Intent.DANGER,
          message: "Có lỗi xảy ra khi xóa hạng mục. Xin hãy thử lại",
        });
        return;
      }
      AppToaster.show({
        intent: Intent.SUCCESS,
        message: "Xóa hạng mục thành công!",
      });
    }

    return (
      <ProjectTagItem
        key={tagID}
        projectTag={tag}
        onDeleteProjectTag={onDelete}
        onUpdateProjectTag={(projectTag: ProjectTag): Promise<void> => onUpdateProjectTag(tagID, projectTag)}
      />
    );
  });

  return (
    <table className={classNames("w-full", Classes.ELEVATION_1)}>
      <thead className="font-bold">
        <tr className="text-gray-1 bg-light-gray-4 border-b border-light-gray-2">
          <td className="w-3/4 py-3 px-4 border-r border-light-gray-2">Tên hạng mục</td>
          <td className="w-1/4 py-3 px-4"/>
        </tr>
      </thead>
      <tbody>
        {tagItems}
      </tbody>
    </table>
  );
}

export type ProjectTagItemProps = {
  projectTag: ProjectTag;
  onDeleteProjectTag(): Promise<void>;
  onUpdateProjectTag(projectTag: ProjectTag): Promise<void>;
};

export function ProjectTagItem({
  projectTag,
  onDeleteProjectTag,
  onUpdateProjectTag,
}: ProjectTagItemProps): React.ReactElement {
  const [isEditProjectTagOpen, setIsEditProjectTagOpen] = React.useState(false);
  return (
    <tr className="bg-white border-b border-light-gray-2">
      <td className="w-3/4 px-4 py-3 border-r border-light-gray-2">{projectTag.getName()}</td>
      <td className="w-1/4 px-4 py-3">
        <div className="flex justify-center">
          <Button
            icon={IconNames.EDIT}
            minimal={true}
            onClick={(): void => setIsEditProjectTagOpen(true)}
            className="mr-2"
          />
          <Popover
            className={Classes.POPOVER_CONTENT_SIZING}
          >
            <Button
              icon={IconNames.TRASH}
              intent={Intent.DANGER}
              minimal={true}
            />
            <div className="p-4">
              <h5 className="font-bold mb-3">Bạn có chắc chắn muốn xóa hạng mục không?</h5>
              <p className="mb-4">Bạn sẽ không thể khôi phục lại hạng mục sau khi xóa</p>
              <div className="flex justify-end">
                <Button className={classNames(Classes.POPOVER_DISMISS, "mr-2")}>
                  Đóng
                </Button>
                <Button intent={Intent.DANGER} onClick={onDeleteProjectTag}>
                  Xác nhận
                </Button>
              </div>
            </div>
          </Popover>
        </div>
      </td>
      <EditProjectTagDialog
        projectTag={projectTag}
        isOpen={isEditProjectTagOpen}
        onClose={(): void => setIsEditProjectTagOpen(false)}
        onSaveProjectTag={onUpdateProjectTag}
      />
    </tr>
  );
}
