// Firebase Cloud FunctionからWebhookを発火させる

import { IWebhook } from "../../domain/interface/discord-actions/webhook.interface";
import { helloAction } from "../actions/hello.action";

export const TimerWebhook: IWebhook = {
  pathName: "time",
  action: helloAction,
};
