import { HTTPException } from "hono/http-exception";
import { findCommand } from "../discord-actions/commands";
import { ActionAndResponse } from "../shared/types";

export function CommandDispatcherUseCase({
  message,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message: any;
}): ActionAndResponse {
  const command = findCommand(message.data.name);
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
