import {Alignment, Button, Navbar, Spinner, Tag} from "@blueprintjs/core";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import {IconNames} from "@blueprintjs/icons";
import {DateTime} from "luxon";
import React from "react";
import {useHistory} from "react-router";

export type ProjectManagerLayoutProps = React.PropsWithChildren<{
  projectName: string;
  loading?: boolean;
  saveSwapTime?: DateTime;
  hasSwap?: boolean;
  archived?: boolean;
}>;

export function ProjectManagerLayout({projectName, loading, children, saveSwapTime, hasSwap, archived}: ProjectManagerLayoutProps): React.ReactElement {
  const history = useHistory();

  return (
    <div className="min-h-screen bg-light-gray-5">
      <Navbar fixedToTop={true}>
        <div className="mx-auto" style={{width: "1260px"}}>
          <Navbar.Group>
            <Button icon={IconNames.ARROW_LEFT} intent={Intent.PRIMARY} onClick={(): void => history.goBack()}>Quay
              lại</Button>
            <Navbar.Divider/>
            <Navbar.Heading className="font-semibold">
              Quản lý dự án: {projectName}
              {hasSwap &&
                <Tag className="ml-2" intent={Intent.WARNING}>Đang thay đổi</Tag>
              }
              {archived &&
                <Tag className="ml-2" intent={Intent.DANGER}>Đã lưu trữ</Tag>
              }
            </Navbar.Heading>
          </Navbar.Group>
          <Navbar.Group align={Alignment.RIGHT}>
            {saveSwapTime &&
              <div className="mr-3 italic text-gray-3 text-sm">
                Lưu thay đổi lúc {saveSwapTime?.setLocale("vi").toLocaleString(DateTime.TIME_WITH_SECONDS)}
              </div>
            }
          </Navbar.Group>
        </div>
      </Navbar>
      <div style={{paddingTop: "50px"}}>
        {loading ? (
          <div className="flex justify-center items-center w-full" style={{height: "calc(100vh - 50px)"}}>
            <Spinner intent={Intent.PRIMARY}/>
          </div>
        ) : (
          <div className="px-4">
            <div className="mx-auto py-4" style={{width: "1260px"}}>
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
