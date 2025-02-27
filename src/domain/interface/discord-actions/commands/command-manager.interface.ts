import { HonoEnv } from "@/shared/hono-env";
import { Context } from "hono";

export interface ICommandManager {
  findCommand({
    commandName,
    c,
  }: {
    commandName: string;
    c: Context<HonoEnv>;
  }): Promise<
    | {
        name: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
      }
    | undefined
  >;

  registerCommands({
    url,
    token,
  }: {
    url: string;
    token: string;
  }): Promise<Response>;

  runCommand({
    c,
    commandName,
    bodyJson,
    guildId,
  }: {
    c: Context<HonoEnv>;
    commandName: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bodyJson: any;
    guildId: string;
  }): Promise<Response>;
}
