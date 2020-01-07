import React from "react";

import {ProjectInfo} from "../../../../common/generated/proto/model/project_pb";

export type ProjectInfoListProps = {
  infos: ProjectInfo.AsObject[];
};

export function ProjectInfoList({infos}: ProjectInfoListProps): React.ReactElement {
  const items = infos.map((info, index) => (
    <tr key={info.name} className={index === infos.length - 1 ? "" : "border-b border-gray-5"}>
      <td className="w-1/4 border-r border-gray-5 py-1 px-3">{info.name}</td>
      <td className="py-1 px-3">{info.value}</td>
    </tr>
  ));

  return (
    <table className="text-sm w-full">
      <thead>
        <tr className="border-b border-gray-5">
          <th className="w-1/4 border-r border-gray-5 px-3 py-1 text-left">Thông tin</th>
          <th className="py-1">Nội dung</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </table>
  );
}
