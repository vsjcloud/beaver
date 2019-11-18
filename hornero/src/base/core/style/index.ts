import classNames from "classnames";

import {StyleProperties} from "./properties";
import Value from "./value";

export interface StyleBuilder {
  toClassName(): string;
}

const N_VARIANTS = 3;

export enum Variant {
  Base = 1 << 0,
  Hover = 1 << 1,
  Active = 1 << 2,
}

export class StyleVariants implements StyleBuilder {
  private readonly variants: StyleProperties[];

  public constructor() {
    this.variants = [];
    for (let i = 0; i < N_VARIANTS; i++) {
      this.variants.push({});
    }
  }

  public get(variants: number): Readonly<StyleProperties | {}> {
    let result: StyleProperties | null = null;
    let copied = false;
    for (let i = 0; i < N_VARIANTS; i++) {
      if ((1 << i) & variants) {
        if (!result) {
          result = this.variants[i];
        } else {
          if (!copied) {
            result = Object.assign({}, result);
            copied = true;
          }
          Object.assign(result, this.variants[i]);
        }
      }
    }
    if (!result) {
      return {};
    }
    return result;
  }

  public set<K extends keyof StyleProperties>(variants: number, partialProperties: Pick<StyleProperties, K>): StyleVariants {
    for (let i = 0; i < N_VARIANTS; i++) {
      if ((1 << i) & variants) {
        Object.assign(this.variants[i], partialProperties);
      }
    }
    return this;
  }

  public toClassName(): string {
    return classNames(
      resolveProperties(this.variants[0]),
      resolveProperties(this.variants[1], "hover"),
      resolveProperties(this.variants[2], "active"),
    );
  }
}

export function resolveProperties(properties: StyleProperties, variant = ""): string {
  const classes = Object.values(properties);
  if (variant === "") {
    return classNames(classes);
  }
  return classNames(classes.map<string>(c => `${variant}:${c}`));
}

export {Value};
