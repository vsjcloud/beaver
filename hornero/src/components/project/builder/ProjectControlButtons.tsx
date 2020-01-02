import {Alert, Button, H5} from "@blueprintjs/core";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import {IconNames} from "@blueprintjs/icons";
import {DateTime} from "luxon";
import React from "react";

export type ProjectControlButtonsProps = {
  allowSubmit: boolean;
  onSubmit(): void;
  saveSwapTime?: DateTime;
  onDeleteSwap?(): Promise<void>;
};

export function ProjectControlButtons({
  allowSubmit,
  onSubmit,
  saveSwapTime,
  onDeleteSwap,
}: ProjectControlButtonsProps): React.ReactElement {
  const [openDeleteSwapAlert, setOpenDeleteSwapAlert] = React.useState(false);

  return (
    <div className="flex flex-row items-center justify-end">
      {saveSwapTime &&
      <div className="mr-3 italic text-gray-3 text-sm">
        Lưu thay đổi lúc {saveSwapTime?.setLocale("vi").toLocaleString(DateTime.TIME_WITH_SECONDS)}
      </div>
      }
      {onDeleteSwap &&
      <React.Fragment>
        <Button
          onClick={(): void => setOpenDeleteSwapAlert(true)}
          icon={IconNames.TRASH}
          intent={Intent.DANGER}
          className="mr-3"
          large={true}
        >
          Xóa thay đổi
        </Button>
        <Alert
          cancelButtonText="Huỷ"
          confirmButtonText="Xác nhận"
          icon={IconNames.TRASH}
          intent={Intent.DANGER}
          isOpen={openDeleteSwapAlert}
          onCancel={(): void => setOpenDeleteSwapAlert(false)}
          onConfirm={onDeleteSwap}
        >
          <div>
            <H5>Xác nhận hủy thay đổi</H5>
            Bạn sẽ không thể khôi phục lại thay đổi hiện tại. Dự án sẽ quay trở lại trạng thái trước khi thay đổi.
          </div>
        </Alert>
      </React.Fragment>
      }
      <Button
        onClick={onSubmit}
        icon={IconNames.SAVED}
        intent={Intent.SUCCESS}
        disabled={!allowSubmit}
        large={true}
        type="submit"
      >
        Lưu dự án
      </Button>
    </div>
  );
}
