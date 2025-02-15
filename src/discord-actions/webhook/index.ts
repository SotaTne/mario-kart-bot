import { IWebhook } from "../../domain/interface/discord-actions/webhook.interface";
import { TimerWebhook } from "./timer.webhook";

export const webhooks = [TimerWebhook];

export function findWebhook(pathName: string): IWebhook | undefined {
  return webhooks.find((webhook) => webhook.pathName === pathName);
}
