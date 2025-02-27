import { IWebhookManager } from "@/domain/interface/discord-actions/webhooks/webhook-manager.interface";
import { getInfo } from "../libs/info";
import { HonoEnv } from "@/shared/hono-env";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { ContentfulStatusCode } from "hono/utils/http-status";

export const WebhookManager: IWebhookManager = {
  async findWebhook({
    pathName,
    c,
  }: {
    pathName: string;
    c: Context<HonoEnv>;
  }): Promise<
    | {
        name: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
      }
    | undefined
  > {
    const info = await getInfo(c);
    return info.webhooks.find((webhook) => webhook.name === pathName);
  },

  async runWebhook({
    c,
    webhookName,
    guildId,
  }: {
    c: Context<HonoEnv>;
    webhookName: string;
    guildId: string;
  }): Promise<Response> {
    return await runWebhook({ c, pathName: webhookName, guildId });
  },
};

async function runWebhook({
  c,
  pathName,
  guildId,
}: {
  c: Context<HonoEnv>;
  pathName: string;
  guildId: string;
}) {
  const webhook = await WebhookManager.findWebhook({ pathName, c });
  if (!webhook) {
    throw new HTTPException(404, { message: "Command not found" });
  }
  const response = await c.env.DISCORD_BOT_EXTENSION.fetch(
    `/servers/${guildId}/webhooks/${pathName}`,
  );
  if (!response.ok) {
    const status: ContentfulStatusCode =
      response.status as ContentfulStatusCode;
    throw new HTTPException(status, { message: "Error running command" });
  }
  return response;
}
