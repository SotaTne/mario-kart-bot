import { IWebhookManager } from "@/domain/interface/discord-actions/webhooks/webhook-manager.interface";
import { WebhookManager } from "@/infra/discord-actions/webhooks/webhook-manager";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export async function WebhookDispatcherUsecase({
  webhookName,
  body,
  c,
}: {
  webhookName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
  c: Context;
}): Promise<Response> {
  const webhookManager: IWebhookManager = WebhookManager;
  const guildId = body.guild_id;
  const webhook = webhookManager.findWebhook({
    pathName: webhookName,
    c,
  });
  if (!webhook) {
    throw new HTTPException(404, { message: "Webhook not found" });
  }
  try {
    const response = await webhookManager.runWebhook({
      c,
      webhookName,
      guildId,
    });
    return response;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err);
    }
    throw new HTTPException(500, { message: "Internal server error" });
  }
}
