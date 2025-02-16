import { HTTPException } from "hono/http-exception";
import { ActionAndResponse } from "../shared/types";
import { CommandManager } from "../discord-actions/commands/command-manager";
import { ICommandManager } from "../domain/interface/discord-actions/commands/command-manager.interface";

export function CommandDispatcherUseCase({
  message,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message: any;
}): ActionAndResponse {
  const commandManager: ICommandManager = CommandManager;

  const command = commandManager.findCommand(message.data.name);
  if (!command) {
    throw new HTTPException(404, { message: "Command not found" });
  }
  try {
    const beforeAction = command.action(message);
    return beforeAction;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err);
    }
    throw new HTTPException(500, { message: "Internal server error" });
  }
}
