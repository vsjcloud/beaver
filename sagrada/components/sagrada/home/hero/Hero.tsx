import classNames from "classnames";
import React from "react";

import {ButtonColor} from "../../../core/button/AbstractButton";
import {LinkButton} from "../../../core/button/LinkButton";

export type HeroProps = {
  className?: string;
};

export function Hero({className}: HeroProps): React.ReactElement {
  return (
    <section className={classNames("flex flex-col", className)}>
      <header>
        <h1 className="font-display text-4xl lg:text-6xl font-bold text-dark-gray-3 text-center">
          Giải pháp cho mọi công trình
        </h1>
        <h3 className="text-blue-2 text-lg lg:text-2xl text-center mx-auto">
          Chuyên nghiệp, nhanh chóng, hiệu quả
        </h3>
        <div className="flex justify-center mt-6">
          <LinkButton to="/projects" className="mr-6" large={true} buttonColor={ButtonColor.Gray}>
            Dự án của VSJ
          </LinkButton>
          <LinkButton to="/contact" large={true} buttonColor={ButtonColor.Blue}>Liên hệ tư vấn</LinkButton>
        </div>
      </header>
      <img className="mx-auto lg:w-4/5 mt-6" src="/hero/hero.svg" alt="hero"/>
    </section>
  );
}
