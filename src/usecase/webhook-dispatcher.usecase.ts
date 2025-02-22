import { IWebhookManager } from "@/domain/interface/discord-actions/webhooks/webhook-manager.interface";
import { WebhookManager } from "@/infra/discord-actions/webhooks/webhook-manager";
import { ActionAndResponse } from "@/shared/types";
import { HTTPException } from "hono/http-exception";

export function WebhookDispatcherUsecase({
  webhookName,
  body,
}: {
  webhookName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
}): ActionAndResponse {
  const webhookManager: IWebhookManager = WebhookManager;
  const webhook = webhookManager.findWebhook(webhookName);
  if (!webhook) {
    throw new HTTPException(404, { message: "Webhook not found" });
  }
  try {
    const action = webhook.action(body);
    return action;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err);
    }
    throw new HTTPException(500, { message: "Internal server error" });
  }
}
