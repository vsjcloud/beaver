import {ID} from "./index";

const PROJECT_SWAP_PARTITION = "swp";

const STATIC_SORT = "s";

export function projectSwapID(projectID: ID): ID {
  return new ID(new ID(projectID.toString(), PROJECT_SWAP_PARTITION).toString(), STATIC_SORT);
}
