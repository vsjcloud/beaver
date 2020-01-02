export const Hello = "hi";

// import {Alert, Button, ControlGroup, Divider, FormGroup, H5, InputGroup, TextArea, Tooltip} from "@blueprintjs/core";
// import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
// import {DateInput} from "@blueprintjs/datetime";
// import {IconNames} from "@blueprintjs/icons";
// import * as jspb from "google-protobuf";
// import {DateTime, Duration} from "luxon";
// import React from "react";
// import uuid from "uuid";
//
// import {ProjectInfoInputList} from "./inputs/ProjectInfoInputList";
//
// import {FormField} from "../../../core/form/formField";
// import {useFormValidator} from "../../../core/form/formValidator";
// import {
//   MaximumDateRule,
//   MinimumDateRule,
//   StringRequiredRule,
//   UploaderPhotosRequiredRule,
//   ValidationRule
// } from "../../../core/form/rules";
// import {Photo, PhotoAndID} from "../../../generated/proto/model/photo_pb";
// import {Project, ProjectInfo, ProjectPhoto} from "../../../generated/proto/model/project_pb";
// import * as Utils from "../../../utils";
// import * as DateTimeUtils from "../../../utils/datetime";
// import * as PhotoUtils from "../../../utils/photo";
// import {PhotoUploader, UploaderPhoto} from "../../photouploader/PhotoUploader";
// import {AppToaster} from "../../toaster/AppToaster";
//
// const MIN_DATE = DateTime.local().minus(Duration.fromObject({years: 20})).toJSDate();
// const MAX_DATE = DateTime.local().plus(Duration.fromObject({years: 20})).toJSDate();
//
// export type ProjectBuilderProps = {
//   project: Project;
//   photos: jspb.Map<string, Photo>;
//   onUploadPhoto(photo: File): Promise<PhotoAndID>;
//   onSaveProject(project: Project): Promise<void>;
//   onSaveSwap(swap: Project): Promise<boolean>;
//   onDeleteSwap?(): Promise<void>;
// };
//
// function projectPhotosToUploaderPhotos(photos: jspb.Map<string, Photo>, projectPhotos: ProjectPhoto[]): UploaderPhoto[] {
//   return projectPhotos.map((projectPhoto) => {
//     const photoModel = photos.get(projectPhoto.getPhotoid())!;
//     return {
//       id: projectPhoto.getPhotoid(),
//       name: photoModel.getName(),
//       description: projectPhoto.getDescription(),
//       previewSet: PhotoUtils.getPhotoURLSetFromPhotoModel(photoModel),
//       preview: PhotoUtils.getPhotoURLFromPhotoModel(photoModel),
//     };
//   });
// }
//
// function projectPhotoToUploaderPhotos(photos: jspb.Map<string, Photo>, projectPhoto?: ProjectPhoto): UploaderPhoto[] {
//   if (projectPhoto) {
//     return projectPhotosToUploaderPhotos(photos, [projectPhoto]);
//   }
//   return projectPhotosToUploaderPhotos(photos, []);
// }
//
// function uploaderPhotoToProjectPhoto(uploaderPhoto: UploaderPhoto): ProjectPhoto {
//   const projectPhoto = new ProjectPhoto();
//   projectPhoto.setPhotoid(uploaderPhoto.id);
//   projectPhoto.setDescription(uploaderPhoto.description);
//   return projectPhoto;
// }
//
// function startDateMaximumRule(finishDate: Date | null): ValidationRule<Date> {
//   return new MaximumDateRule(finishDate || MAX_DATE, "Ngày bắt đầu dự án không thể ở sau ngày hoàn thành");
// }
//
// function finishDateMinimumRule(startDate: Date | null): ValidationRule<Date> {
//   return new MinimumDateRule(startDate || MIN_DATE, "Ngày hoàn thành dự án không thể ở trước ngày bắt đầu");
// }
//
// export function ProjectBuilderOld({
//   project,
//   photos,
//   onUploadPhoto,
//   onSaveProject,
//   onSaveSwap,
//   onDeleteSwap,
// }: ProjectBuilderProps): React.ReactElement {
//   const {registerField, wrapSubmit, allowSubmit} = useFormValidator();
//
//   const [name, setName] = registerField(React.useState(new FormField(project.getName(), [
//     new StringRequiredRule("Tên dự án không được để trống"),
//   ])));
//   const [description, setDescription] = registerField(React.useState(new FormField(project.getDescription(), [
//     new StringRequiredRule("Giới thiệu về dự án không được để trống"),
//   ])));
//   const [featurePhoto, setFeaturePhoto] = registerField(React.useState(new FormField(projectPhotoToUploaderPhotos(photos, project.getFeaturephoto()), [
//     new UploaderPhotosRequiredRule("Bạn cần chọn ảnh đại diện của dự án"),
//   ])));
//   const [albumPhotos, setAlbumPhotos] = registerField(React.useState(new FormField(projectPhotosToUploaderPhotos(photos, project.getAlbumphotosList()), [
//     new UploaderPhotosRequiredRule("Bạn cần chọn ít nhất 1 ảnh dự án"),
//   ])));
//   const [startDate, setStartDate] = registerField(React.useState(new FormField(project.getStartdate()?.toDate() || MIN_DATE, [])));
//   const [hasStartDate, setHasStartDate] = React.useState(!!project.getStartdate());
//   function getStartDate(): Date | null {
//     if (!hasStartDate) return null;
//     return startDate.getValue();
//   }
//   const [finishDate, setFinishDate] = registerField(React.useState(new FormField(project.getFinishdate()?.toDate() || MIN_DATE, [])));
//   const [hasFinishDate, setHasFinishDate] = React.useState(!!project.getFinishdate());
//   function getFinishDate(): Date | null {
//     if (!hasFinishDate) return null;
//     return finishDate.getValue();
//   }
//   const [projectInfos, setProjectInfos] = registerField(React.useState(new FormField(
//     project.getDetailsList().map<[string, ProjectInfo]>((projectInfo) => [uuid.v4(), projectInfo]),
//     [],
//   )));
//
//   const [openDeleteSwapAlert, setOpenDeleteSwapAlert] = React.useState(false);
//   const [saveSwapTime, setSaveSwapTime] = React.useState<DateTime>();
//
//   React.useEffect(function () {
//     setStartDate(startDate => startDate.setRules([startDateMaximumRule(getFinishDate())]));
//     setFinishDate(finishDate => finishDate.setRules([finishDateMinimumRule(getStartDate())]));
//   }, []);
//
//   const buildProject = React.useCallback(function (): Project {
//     const project = new Project();
//     project.setName(name.getValue().trim());
//     project.setDescription(description.getValue().trim());
//     project.setFeaturephoto(featurePhoto.getValue().length > 0 ? uploaderPhotoToProjectPhoto(featurePhoto.getValue()[0]) : undefined);
//     project.setAlbumphotosList(albumPhotos.getValue().map(uploaderPhotoToProjectPhoto));
//     project.setStartdate(hasStartDate ? DateTimeUtils.jsDateToProtoTimestamp(startDate.getValue()) : undefined);
//     project.setFinishdate(hasFinishDate ? DateTimeUtils.jsDateToProtoTimestamp(finishDate.getValue()) : undefined);
//     project.setDetailsList(
//       projectInfos
//         .getValue()
//         .filter(([, projectInfo]) => projectInfo.getName() !== "" && projectInfo.getValue() !== "")
//         .map(([_, projectInfo]) => projectInfo),
//     );
//     return project;
//   }, [albumPhotos, description, featurePhoto, name, startDate, hasStartDate, finishDate, hasFinishDate, projectInfos]);
//
//   const swapProject = React.useRef(project);
//
//   React.useEffect(function () {
//     const tick = setTimeout(function () {
//       swapProject.current = buildProject();
//     }, 500);
//     return function (): void {
//       clearTimeout(tick);
//     };
//   }, [buildProject]);
//
//   React.useEffect(function () {
//     return function (): void {
//       (async function (): Promise<void> {
//         await onSaveSwap(swapProject.current);
//       })();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//
//   React.useEffect(function () {
//     const tick = setTimeout(async function () {
//       const swapIsChanged = await onSaveSwap(buildProject());
//       if (swapIsChanged) {
//         setSaveSwapTime(DateTime.local());
//       }
//     }, 10000);
//     return (): void => clearTimeout(tick);
//   }, [buildProject, onSaveSwap]);
//
//   const onSubmit = wrapSubmit(async function () {
//     await onSaveProject(buildProject());
//   }, function () {
//     AppToaster.show({
//       intent: Intent.DANGER,
//       message: "Một số thông tin không hợp lệ. Vui lòng kiểm tra và sửa lại",
//     });
//   });
//
//   function onDeleteStartDate(): void {
//     setHasStartDate(false);
//     setStartDate(startDate.setValue(MIN_DATE));
//     setFinishDate(finishDate.setRules([finishDateMinimumRule(MIN_DATE)]));
//   }
//
//   function onStartDateChange(selectedDate: Date | null, isUserChange: boolean): void {
//     if (!isUserChange) return;
//     if (!selectedDate) {
//       onDeleteStartDate();
//       return;
//     }
//     setStartDate(startDate.setValue(selectedDate));
//     setFinishDate(finishDate.setRules([finishDateMinimumRule(selectedDate)]));
//     setHasStartDate(true);
//   }
//
//   function onDeleteFinishDate(): void {
//     setHasFinishDate(false);
//     setFinishDate(finishDate.setValue(MIN_DATE));
//   }
//
//   function onFinishDateChange(selectedDate: Date | null, isUserChange: boolean): void {
//     if (!isUserChange) return;
//     if (!selectedDate) {
//       onDeleteStartDate();
//       return;
//     }
//     setFinishDate(finishDate.setValue(selectedDate));
//     setHasFinishDate(true);
//   }
//
//   function formatDate(date: Date): string {
//     return DateTime.fromJSDate(date).setLocale("vi").toFormat("DDD");
//   }
//
//   function parseDate(date: string): Date {
//     return DateTime.fromFormat(date, "DDD", {locale: "vi"}).toJSDate();
//   }
//
//   return (
//     <React.Fragment>
//       <FormGroup
//         label="Tên dự án"
//         labelFor="project-name"
//         labelInfo="(bắt buộc)"
//         intent={name.intent()}
//         helperText={name.message()}
//       >
//         <InputGroup
//           id="project-name"
//           value={name.getValue()}
//           onChange={Utils.onInputChange((newValue) => setName(name.setValue(newValue)))}
//           intent={name.intent()}
//           placeholder="Tên của dự án..."
//         />
//       </FormGroup>
//       <FormGroup
//         label="Giới thiệu về dự án"
//         labelFor="project-description"
//         labelInfo="(bắt buộc)"
//         intent={description.intent()}
//         helperText={description.message()}
//       >
//         <TextArea
//           id="project-description"
//           value={description.getValue()}
//           fill={true}
//           growVertically={true}
//           style={{minHeight: "120px"}}
//           onChange={Utils.onTextAreaChange((newValue) => setDescription(description.setValue(newValue)))}
//           intent={description.intent()}
//           placeholder="Giới thiệu về dự án..."
//         />
//       </FormGroup>
//       <FormGroup
//         label="Ảnh đại diện của dự án"
//         labelFor="project-feature-photo"
//         labelInfo="(bắt buộc)"
//         intent={featurePhoto.intent()}
//         helperText={featurePhoto.message()}
//       >
//         <PhotoUploader
//           id="project-feature-photo"
//           multiple={false}
//           photos={featurePhoto.getValue()}
//           onUpdatePhotos={(newValue): void => setFeaturePhoto(featurePhoto.setValue(newValue))}
//           onUploadPhoto={onUploadPhoto}
//           intent={featurePhoto.intent()}
//         />
//       </FormGroup>
//       <FormGroup
//         label="Ảnh dự án"
//         labelFor="project-album-photos"
//         labelInfo="(bắt buộc)"
//         intent={albumPhotos.intent()}
//         helperText={albumPhotos.message()}
//       >
//         <PhotoUploader
//           id="project-album-photos"
//           multiple={true}
//           photos={albumPhotos.getValue()}
//           onUpdatePhotos={(newValue): void => setAlbumPhotos(albumPhotos.setValue(newValue))}
//           onUploadPhoto={onUploadPhoto}
//           intent={albumPhotos.intent()}
//         />
//       </FormGroup>
//       <FormGroup
//         label="Ngày bắt đầu dự án"
//       >
//         <ControlGroup>
//           <DateInput
//             onChange={onStartDateChange}
//             value={getStartDate()}
//             formatDate={formatDate}
//             parseDate={parseDate}
//             minDate={MIN_DATE}
//             maxDate={MAX_DATE}
//             placeholder="Ngày bắt đầu dự án..."
//           />
//           <Tooltip content="Xóa">
//             <Button icon={IconNames.DELETE} onClick={onDeleteStartDate}/>
//           </Tooltip>
//         </ControlGroup>
//       </FormGroup>
//       <FormGroup
//         label="Ngày hoàn thành dự án"
//       >
//         <ControlGroup>
//           <DateInput
//             onChange={onFinishDateChange}
//             value={getFinishDate()}
//             formatDate={formatDate}
//             parseDate={parseDate}
//             minDate={hasStartDate ? startDate.getValue() : MIN_DATE}
//             initialMonth={hasStartDate ? startDate.getValue() : new Date()}
//             maxDate={MAX_DATE}
//             placeholder="Ngày dự án hoàn thành..."
//           />
//           <Tooltip content="Xóa">
//             <Button icon={IconNames.DELETE} onClick={onDeleteFinishDate}/>
//           </Tooltip>
//         </ControlGroup>
//       </FormGroup>
//       <FormGroup
//         label="Thông tin chi tiết"
//       >
//         <ProjectInfoInputList
//           projectInfos={projectInfos.getValue()}
//           onUpdateProjectInfos={(newValue): void => setProjectInfos(projectInfos.setValue(newValue))}
//           registerField={registerField}
//         />
//       </FormGroup>
//       <Divider className="my-5"/>
//       <div className="flex flex-row items-center justify-end">
//         {saveSwapTime &&
//         <div className="mr-3 italic text-gray-3 text-sm">
//           Lưu thay đổi lúc {saveSwapTime?.setLocale("vi").toLocaleString(DateTime.TIME_WITH_SECONDS)}
//         </div>
//         }
//         {onDeleteSwap &&
//         <React.Fragment>
//           <Button
//             onClick={(): void => setOpenDeleteSwapAlert(true)}
//             icon={IconNames.TRASH}
//             intent={Intent.DANGER}
//             className="mr-3"
//             large={true}
//           >
//             Xóa thay đổi
//           </Button>
//           <Alert
//             cancelButtonText="Huỷ"
//             confirmButtonText="Xác nhận"
//             icon={IconNames.TRASH}
//             intent={Intent.DANGER}
//             isOpen={openDeleteSwapAlert}
//             onCancel={(): void => setOpenDeleteSwapAlert(false)}
//             onConfirm={onDeleteSwap}
//           >
//             <div>
//               <H5>Xác nhận hủy thay đổi</H5>
//               Bạn sẽ không thể khôi phục lại thay đổi hiện tại. Dự án sẽ quay trở lại trạng thái trước khi thay đổi.
//             </div>
//           </Alert>
//         </React.Fragment>
//         }
//         <Button
//           onClick={onSubmit}
//           icon={IconNames.SAVED}
//           intent={Intent.SUCCESS}
//           disabled={!allowSubmit()}
//           large={true}
//           type="submit"
//         >
//           Lưu dự án
//         </Button>
//       </div>
//     </React.Fragment>
//   );
// }
