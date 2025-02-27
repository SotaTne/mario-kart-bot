import { HonoEnv } from "@/shared/hono-env";
import { Context } from "hono";

export interface IWebhookManager {
  findWebhook({
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
  >;
  runWebhook({
    c,
    webhookName,
    guildId,
  }: {
    c: Context<HonoEnv>;
    webhookName: string;
    guildId: string;
  }): Promise<Response>;
}
