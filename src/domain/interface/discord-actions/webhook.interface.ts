import { Action } from "../../../shared/types";

export interface IWebhook {
  pathName: string;
  action: Action;
}
