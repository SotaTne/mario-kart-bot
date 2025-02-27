/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICommandManager } from "@/domain/interface/discord-actions/commands/command-manager.interface";
import { Context } from "hono";
import { HonoEnv } from "@/shared/hono-env";
import { HTTPException } from "hono/http-exception";
import { ContentfulStatusCode } from "hono/utils/http-status";
import { getInfo } from "../libs/info";

async function runCommand({
  c,
  commandName,
  body,
  guildId,
}: {
  c: Context<HonoEnv>;
  commandName: string;
  body: any;
  guildId: string;
}) {
  const command = await CommandManager.findCommand({ commandName, c });
  if (!command) {
    throw new HTTPException(404, { message: "Command not found" });
  }
  const response = await c.env.DISCORD_BOT_EXTENSION.fetch(
    `/servers/${guildId}/commands/${commandName}`,
    body,
  );
  if (!response.ok) {
    const status: ContentfulStatusCode =
      response.status as ContentfulStatusCode;
    throw new HTTPException(status, { message: "Error running command" });
  }
  return response;
}

export const CommandManager: ICommandManager = {
  findCommand: async function ({
    commandName,
    c,
  }: {
    commandName: string;
    c: Context<HonoEnv>;
  }) {
    const info = await getInfo(c);
    return info.commands.find((command) => command.name === commandName);
  },
  registerCommands: async function ({
    url,
    token,
    c,
  }: {
    url: string;
    token: string;
    c: Context<HonoEnv>;
  }): Promise<Response> {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${token}`,
      },
      method: "PUT",
      body: JSON.stringify((await getInfo(c)).commands),
    });

    if (response.ok) {
      console.log("Registered all commands");
    } else {
      console.error("Error registering commands");
      const text = await response.text();
      console.error(text);
    }
    return response;
  },

  runCommand: async function ({
    commandName,
    guildId,
    c,
    bodyJson,
  }: {
    commandName: string;
    guildId: string;
    c: Context<HonoEnv>;
    bodyJson: any;
  }) {
    return await runCommand({ c, commandName, body: bodyJson, guildId });
  },
};
