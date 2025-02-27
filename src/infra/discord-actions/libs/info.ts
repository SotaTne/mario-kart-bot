/* eslint-disable @typescript-eslint/no-explicit-any */
import { HonoEnv } from "@/shared/hono-env";
import { Context } from "hono";

export async function getInfo(c: Context<HonoEnv>) {
  const info = (await (
    await c.env.DISCORD_BOT_EXTENSION.fetch("/info")
  ).json()) as { commands?: any; webhooks?: any; otherEvents?: any };
  const returnObject: {
    commands: {
      name: string;
      [key: string]: any;
    }[];
    webhooks: {
      name: string;
      [key: string]: any;
    }[];
    otherEvents: {
      name: string;
      [key: string]: any;
    }[];
  } = {
    commands: [],
    webhooks: [],
    otherEvents: [],
  };
  if (info?.commands) {
    returnObject.commands = info.commands;
  }
  if (info?.webhooks) {
    returnObject.webhooks = info.webhooks;
  }
  if (info?.otherEvents) {
    returnObject.otherEvents = info.otherEvents;
  }
  console.error("info", returnObject);
  return returnObject;
}
