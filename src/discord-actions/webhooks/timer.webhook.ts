// Firebase Cloud FunctionからWebhookを発火させる

import { WebhookEntity } from "../../domain/entity/discord-actions/webhooks/webhook.entity";
import { helloAction } from "../actions/hello.action";

export const TimerWebhook: WebhookEntity = new WebhookEntity({
  pathName: "timer",
  description: "Timer webhook",
  action: helloAction,
});
