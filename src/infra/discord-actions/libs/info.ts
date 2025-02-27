/* eslint-disable @typescript-eslint/no-explicit-any */
import { HonoEnv } from "@/shared/hono-env";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export async function getInfo(c: Context<HonoEnv>) {
  const response = await c.env.DISCORD_BOT_EXTENSION.fetch("/info");
  if (!response.ok) {
    throw new HTTPException(500, { message: "Error fetching info" });
  }
  const info = (await response.json()) as {
    commands?: any;
    webhooks?: any;
    otherEvents?: any;
  };
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
  console.log("log", returnObject);
  return returnObject;
}
