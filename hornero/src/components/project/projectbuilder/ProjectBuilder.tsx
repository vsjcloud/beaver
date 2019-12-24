import {Divider, FormGroup, H3, InputGroup} from "@blueprintjs/core";
import React from "react";
import {useLocation, useParams} from "react-router";

import {EMPTY_STRING_FORM_FIELD, FormField} from "../../../core/form/field";
import {RequiredRule} from "../../../core/form/rules";
import {Project} from "../../../generated/proto/model/project_pb";
import {GetProjectWithSwapRequest} from "../../../generated/proto/rpc/project/project_pb";
import {ProjectService} from "../../../service/project";
import {useAuth0} from "../../auth0/Auth0Provider";
import {BaseLayout} from "../../layout/BaseLayout";

function useQuery(): URLSearchParams {
  return new URLSearchParams(useLocation().search);
}

export function ProjectBuilder(): React.ReactElement {
  const {token} = useAuth0()!;
  const [isNew, setIsNew] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [project, setProject] = React.useState<Project>(new Project());
  const query = useQuery();
  const {projectID} = useParams();
  const [nameField, setNameField] = React.useState(EMPTY_STRING_FORM_FIELD);
  const [descriptionField, setDescriptionField] = React.useState(EMPTY_STRING_FORM_FIELD);

  React.useEffect(function () {
    (async function (): Promise<void> {
      if (projectID) {
        let effectProject = project;
        if (query.get("new")) {
          setIsNew(true);
        } else {
          const request = new GetProjectWithSwapRequest();
          request.setProjectid(projectID);
          const response = await ProjectService.getProjectWithSwap(token, request);
          effectProject = response.getSwap() ? response.getSwap()! : response.getProject()!;
          setProject(effectProject);
        }
        setNameField(new FormField<string>(effectProject.getName(), [
          new RequiredRule("Tên dự án không được để trống"),
        ]));
        setDescriptionField(new FormField<string>(effectProject.getDescription(), []));
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, projectID]);

  const onProjectNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNameField(nameField.updateValue(event.target.value));
  };

  const onProjectDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDescriptionField(descriptionField.updateValue(event.target.value));
  };

  return (
    <BaseLayout loading={loading}>
      <div className="mx-auto mt-6" style={{width: "500px"}}>
        <H3>{isNew ? "Tạo dự án mới" : "Thay đổi dự án"}</H3>
        <Divider className="mb-6"/>
        <FormGroup
          label="Tên dự án"
          labelFor="project-name"
          labelInfo="(bắt buộc)"
          intent={nameField.intent()}
          helperText={nameField.failureMessage()}
        >
          <InputGroup
            id="project-name"
            value={nameField.getValue()}
            onChange={onProjectNameChange}
            intent={nameField.intent()}
            placeholder="Nhập tên của dự án..."
          />
        </FormGroup>
        <FormGroup
          label="Giới thiệu về dự án"
          labelFor="project-description"
          intent={descriptionField.intent()}
          helperText={descriptionField.failureMessage()}
        >
          <InputGroup
            id="project-description"
            value={descriptionField.getValue()}
            onChange={onProjectDescriptionChange}
            intent={descriptionField.intent()}
            placeholder="Giới thiệu chung về dự án..."
          />
        </FormGroup>
      </div>
    </BaseLayout>
  );
}
