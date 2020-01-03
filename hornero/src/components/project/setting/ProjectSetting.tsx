import {Button, H4, Intent} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";
import React from "react";

export type ProjectSettingProps = {
  onArchiveProject?(): Promise<void>;
  onRecoverProject?(): Promise<void>;
};

export function ProjectSetting({onArchiveProject, onRecoverProject}: ProjectSettingProps): React.ReactElement {
  return (
    <React.Fragment>
      {onArchiveProject &&
        <div>
          <H4>Lưu trữ dự án</H4>
          <div className="mb-3">
            Sau khi lưu trữ, dự án sẽ bị ẩn đi và người dùng sẽ không thể truy cập vào dự án. Dự án có thể
            được khôi phục lại từ trong &quot;Dự án được lưu trữ&quot;.
          </div>
          <Button intent={Intent.DANGER} icon={IconNames.ARCHIVE} onClick={onArchiveProject}>Lưu trữ dự án</Button>
        </div>
      }
      {onRecoverProject &&
        <div>
          <H4>Khôi phục dự án</H4>
          <div className="mb-3">
            Sau khi khôi phục dự án có thể truy cập được bởi mọi người dùng.
          </div>
          <Button intent={Intent.SUCCESS} icon={IconNames.UNARCHIVE} onClick={onRecoverProject}>Khôi phục dự án</Button>
        </div>
      }
    </React.Fragment>
  )
}
