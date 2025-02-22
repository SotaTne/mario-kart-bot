import { Action } from "@/shared/types";
import { InteractionResponseType } from "discord-interactions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const helloAction: Action = (body: any) => {
  return async (c) => {
    console.log("run_hello");
    return c.json({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "Hello, World!",
      },
    });
  };
};
