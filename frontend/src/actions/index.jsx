import { CHANGE_PAGE } from "./action-types";
 

export function changePage(payload) {
  return { type: CHANGE_PAGE, payload }
};
