import { getDiscordApplicationURL } from "@/config/configs";
import { ICommandManager } from "@/domain/interface/discord-actions/commands/command-manager.interface";
import { CommandManager } from "@/infra/discord-actions/commands/command-manager";
import { Env } from "@/shared/hono-env";
import { Context } from "hono";

export async function RegisterCommandUseCase(c: Context<Env>) {
  const applicationId = c.env.DISCORD_APPLICATION_ID;
  const token = c.env.DISCORD_TOKEN;
  const url = getDiscordApplicationURL(applicationId);
  const commandManager: ICommandManager = CommandManager;
  await commandManager.registerCommands({ url, token });
}
