import classNames from "classnames";
import React from "react";

import {ButtonColor} from "../../../core/button/AbstractButton";
import {LinkButton} from "../../../core/button/LinkButton";

export type OnboardingCardProps = {
  image: string;
  title: string;
  description: string;
  className?: string;
};

export function OnboardingCard({
  image,
  title,
  description,
  className,
}: OnboardingCardProps): React.ReactElement {
  return (
    <div className={classNames(className, "p-4 flex")}>
      <div
        className="flex onboarding-card flex-col w-full px-8 py-10 rounded border border-light-gray-4 text-dark-gray-3"
      >
        <img className="h-48 w-48 mx-auto mb-3" src={image} alt={title}/>
        <h4 className="font-semibold text-xl text-center mb-3">{title}</h4>
        <div className="text-center mb-6">{description}</div>
        <LinkButton to="/projects" className="mx-auto" buttonColor={ButtonColor.Blue}>
          Tìm hiểu thêm
        </LinkButton>
      </div>
    </div>
  );
}
