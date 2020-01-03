import {Divider} from "@blueprintjs/core";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import * as jspb from "google-protobuf";
import {Timestamp} from "google-protobuf/google/protobuf/timestamp_pb";
import React from "react";

import {ProjectAlbumPhotosField} from "./fields/ProjectAlbumPhotosField";
import {ProjectDatesField} from "./fields/ProjectDatesField";
import {ProjectDescriptionField} from "./fields/ProjectDescriptionField";
import {ProjectFeaturePhotoField} from "./fields/ProjectFeaturePhotoField";
import {ProjectInfosField} from "./fields/ProjectInfosField";
import {ProjectNameField} from "./fields/ProjectNameField";
import {ProjectControlButtons} from "./ProjectControlButtons";

import {AppToaster} from "../../toaster/AppToaster";
import {Project} from "../../../generated/proto/model/project_pb";
import {Photo, PhotoAndID} from "../../../generated/proto/model/photo_pb";
import {useFormValidator} from "../../../core/form/formValidator";

export type ProjectBuilderProps = {
  initialProject: Project;
  initialPhotos: jspb.Map<string, Photo>;
  onUploadPhoto(photo: File): Promise<PhotoAndID>;
  onSaveProject(editedProject: Project): Promise<void>;
  onSaveSwap(editedSwap: Project, unmount: boolean): Promise<boolean>;
  onDeleteSwap?(): Promise<void>;
  onProjectNameChange(newName: string): void;
};

export function ProjectBuilder({
  initialProject,
  initialPhotos,
  onUploadPhoto,
  onSaveProject,
  onSaveSwap,
  onDeleteSwap,
  onProjectNameChange,
}: ProjectBuilderProps): React.ReactElement {
  const {registerField, wrapSubmit, allowSubmit} = useFormValidator();

  const [name, setName] = React.useState(initialProject.getName());
  const [description, setDescription] = React.useState(initialProject.getDescription());
  const [startDate, setStartDate] = React.useState(initialProject.getStartdate());
  const [finishDate, setFinishDate] = React.useState(initialProject.getFinishdate());
  const [projectInfos, setProjectInfos] = React.useState(initialProject.getDetailsList());
  const [featurePhoto, setFeaturePhoto] = React.useState(initialProject.getFeaturephoto());
  const [albumPhotos, setAlbumPhotos] = React.useState(initialProject.getAlbumphotosList());

  const buildProject = React.useCallback(function (): Project {
    const project = new Project();
    project.setName(name.trim());
    project.setDescription(description.trim());
    project.setFeaturephoto(featurePhoto);
    project.setAlbumphotosList(albumPhotos);
    project.setStartdate(startDate);
    project.setFinishdate(finishDate);
    project.setDetailsList(projectInfos.filter((projectInfo) => projectInfo.getName() !== "" && projectInfo.getValue() !== ""));
    return project;
  }, [albumPhotos, description, featurePhoto, name, startDate, finishDate, projectInfos]);

  const swapProject = React.useRef(initialProject);

  React.useEffect(function () {
    onProjectNameChange(name);
  }, [name, onProjectNameChange]);

  React.useEffect(function () {
    const tick = setTimeout(function () {
      swapProject.current = buildProject();
    }, 500);
    return function (): void {
      clearTimeout(tick);
    };
  }, [buildProject]);

  React.useEffect(function () {
    return function (): void {
      (async function (): Promise<void> {
        await onSaveSwap(swapProject.current, true);
      })();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(function () {
    const tick = setTimeout(async function () {
      await onSaveSwap(buildProject(), false);
    }, 5000);
    return (): void => clearTimeout(tick);
  }, [buildProject, onSaveSwap]);

  const onSubmit = wrapSubmit(async function () {
    await onSaveProject(buildProject());
  }, function () {
    AppToaster.show({
      intent: Intent.DANGER,
      message: "Một số thông tin không hợp lệ. Vui lòng kiểm tra và sửa lại",
    });
  });

  const onDatesChange = React.useCallback(function (newStartDate?: Timestamp, newFinishDate?: Timestamp): void {
    setStartDate(newStartDate);
    setFinishDate(newFinishDate);
  }, []);

  return (
    <React.Fragment>
      <ProjectNameField
        initialValue={initialProject.getName()}
        onChange={setName}
        registerField={registerField}
      />
      <ProjectDescriptionField
        initialValue={initialProject.getDescription()}
        onChange={setDescription}
        registerField={registerField}
      />
      <ProjectDatesField
        initialStartDate={initialProject.getStartdate()}
        initialFinishDate={initialProject.getFinishdate()}
        onChange={onDatesChange}
        registerField={registerField}
      />
      <ProjectInfosField
        initialValue={initialProject.getDetailsList()}
        onChange={setProjectInfos}
        registerField={registerField}
      />
      <ProjectFeaturePhotoField
        initialValue={initialProject.getFeaturephoto()}
        initialPhotos={initialPhotos}
        onChange={setFeaturePhoto}
        onUploadPhoto={onUploadPhoto}
        registerField={registerField}
      />
      <ProjectAlbumPhotosField
        initialValue={initialProject.getAlbumphotosList()}
        initialPhotos={initialPhotos}
        onChange={setAlbumPhotos}
        onUploadPhoto={onUploadPhoto}
        registerField={registerField}
      />
      <Divider className="my-5"/>
      <ProjectControlButtons
        allowSubmit={allowSubmit()}
        onSubmit={onSubmit}
        onDeleteSwap={onDeleteSwap}
      />
    </React.Fragment>
  );
}
