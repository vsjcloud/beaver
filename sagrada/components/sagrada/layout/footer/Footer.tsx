import classNames from "classnames";
import React from "react";

import {Icon} from "../../../core/icon/Icon";
import {IconName} from "../../../core/icon/iconName";
import {AnchorLink} from "../../../core/link/AnchorLink";

export type FooterProps = {
  className?: string;
};

export function Footer({className}: FooterProps): React.ReactElement {
  return (
    <div className={classNames(className, "bg-light-gray-5 text-dark-gray-4")}>
      <div className="container m-auto flex flex-row justify-between">
        <div className="lg:flex flex-row hidden">
          <div className="mr-16">
            <h6 className="uppercase text-gray-4">Dự án</h6>
            <AnchorLink to="/projects">Dự án</AnchorLink>
          </div>
          <div className="mr-16">
            <h6 className="uppercase text-gray-4">Công ty</h6>
            <AnchorLink to="/about">Giới thiệu</AnchorLink>
          </div>
        </div>
        <div className="flex flex-col lg:items-end items-center w-full lg:w-auto">
          <AnchorLink
            className="border px-4 py-2 border-gray-1 rounded hover:text-dark-gray-1 mb-3"
            to="/projects"
          >
            Liên hệ
          </AnchorLink>
          <a href="tel:84-24-6292-3833" className="flex items-center mb-3 text-blue-3 hover:underline">
            <Icon className="h-4 w-4 mr-2 inline" icon={IconName.Phone}/>
            <span>(+84) 24 6292 3833</span>
          </a>
          <div className="lg:text-right text-center mb-3">
            1907 Sunshine Palace<br/>
            Ngõ 13 Lĩnh Nam, Mai Động, Hoàng Mai, Hà Nội
          </div>
          <div className="text-gray-3 text-sm">
            Bản quyền thuộc về &copy; {new Date().getFullYear()} VSJ
          </div>
        </div>
      </div>
    </div>
  );
}
