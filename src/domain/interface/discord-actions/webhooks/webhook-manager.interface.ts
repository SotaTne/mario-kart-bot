import { WebhookEntity } from "@/domain/entity/discord-actions/webhooks/webhook.entity";

export interface IWebhookManager {
  findWebhook(pathName: string): WebhookEntity | undefined;
}
