import { WebhookEntity } from "../../domain/entity/discord-actions/webhooks/webhook.entity";
import { IWebhookManager } from "../../domain/interface/discord-actions/webhooks/webhook-manager.interface";
import { TimerWebhook } from "./timer.webhook";

const webhooks: WebhookEntity[] = [TimerWebhook];

export const WebhookManager: IWebhookManager = {
  findWebhook(pathName: string): WebhookEntity | undefined {
    return webhooks.find((webhook) => webhook.pathName === pathName);
  },
};
