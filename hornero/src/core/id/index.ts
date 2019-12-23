export class ID {
  public readonly partition: string;
  public readonly sort: string;

  public constructor(partition: string, sort: string) {
    this.partition = partition;
    this.sort = sort;
  }

  public toString(): string {
    return `${this.partition}.${this.sort}`;
  }
}

export const EMPTY_ID: ID = new ID("", "");

export function parseID(id: string): ID {
  const p = id.lastIndexOf(".");
  if (p === -1) {
    return EMPTY_ID;
  }
  return new ID(id.substr(0, p), id.substr(p + 1));
}
