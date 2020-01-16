import {FormGroup, MenuItem} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";
import {ItemRenderer, MultiSelect} from "@blueprintjs/select";
import * as jspb from "google-protobuf";
import produce from "immer";
import React from "react";

import {ProjectTag} from "../../../../generated/proto/model/project_pb";
import * as Utils from "../../../../utils";

export type ProjectTagsFieldProps = {
  tagIDs: string[];
  tags: jspb.Map<string, ProjectTag>;
  onChange(newTagIDs: string[]): void;
};

const ProjectTagMultiSelect = MultiSelect.ofType<string>();

export function ProjectTagsField({
  tagIDs,
  tags,
  onChange,
}: ProjectTagsFieldProps): React.ReactElement {
  function getSelectedTagIndex(tagID: string): number {
    return tagIDs.findIndex((value) => value === tagID);
  }

  function isProjectTagSelected(tagID: string): boolean {
    return getSelectedTagIndex(tagID) !== -1;
  }

  function addProjectTag(projectTagID: string): void {
    onChange(produce(tagIDs, draft => {
      draft.push(projectTagID);
    }));
  }

  function deleteProjectTag(index: number): void {
    onChange(produce(tagIDs, draft => {
      draft.splice(index, 1);
    }));
  }

  function handleTagRemove(_tag: string, index: number): void {
    deleteProjectTag(index);
  }

  function onSelectProjectTag(projectTagID: string): void {
    if (!isProjectTagSelected(projectTagID)) {
      addProjectTag(projectTagID);
    } else {
      deleteProjectTag(getSelectedTagIndex(projectTagID));
    }
  }

  function getProjectTag(projectTagID: string): ProjectTag {
    return tags.get(projectTagID)!;
  }

  const renderProjectTag: ItemRenderer<string> = (projectTagID, {modifiers, handleClick}) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        icon={isProjectTagSelected(projectTagID) ? IconNames.TICK : IconNames.BLANK}
        key={projectTagID}
        onClick={handleClick}
        text={getProjectTag(projectTagID).getName()}
        shouldDismissPopover={false}
      />
    );
  };

  return (
    <FormGroup
      label="Hạng mục"
      labelFor="project-tags"
    >
      <ProjectTagMultiSelect
        tagInputProps={{
          inputProps: {
            id: "project-tags",
          },
          onRemove: handleTagRemove,
        }}
        fill={true}
        itemRenderer={renderProjectTag}
        items={Utils.pbMapTransform(tags, (_, projectTagID) => projectTagID)}
        selectedItems={tagIDs}
        onItemSelect={onSelectProjectTag}
        tagRenderer={(projectTagID): string => getProjectTag(projectTagID).getName()}
        placeholder="Chọn hạng mục của dự án..."
        noResults={
          <MenuItem disabled={true} text="Không tìm thấy hạng mục nào."/>
        }
      />
    </FormGroup>
  );
}
