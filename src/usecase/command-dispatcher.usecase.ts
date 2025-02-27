import { ICommandManager } from "@/domain/interface/discord-actions/commands/command-manager.interface";
import { CommandManager } from "@/infra/discord-actions/commands/command-manager";
import { HonoEnv } from "@/shared/hono-env";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export async function CommandDispatcherUseCase({
  message,
  c,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message: any;
  c: Context<HonoEnv>;
}): Promise<Response> {
  const commandManager: ICommandManager = CommandManager;
  const guildId = message.guild_id;
  const command = commandManager.findCommand(message.data.name);
  if (!command) {
    throw new HTTPException(404, { message: "Command not found" });
  }
  if (!guildId) {
    throw new HTTPException(404, { message: "Please Run Command From Server" });
  }
  try {
    const beforeAction = await commandManager.runCommand({
      c,
      commandName: message.data.name,
      bodyJson: message,
      guildId,
    });
    return beforeAction;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err);
    }
    throw new HTTPException(500, { message: "Internal server error" });
  }
}
