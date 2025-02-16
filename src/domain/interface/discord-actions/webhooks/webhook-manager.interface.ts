import { WebhookEntity } from "../../../entity/discord-actions/webhooks/webhook.entity";

export interface IWebhookManager {
  findWebhook(pathName: string): WebhookEntity | undefined;
}
