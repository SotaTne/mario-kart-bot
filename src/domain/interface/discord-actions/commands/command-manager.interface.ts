import { CommandEntity } from "../../../entity/discord-actions/commands/command.entity";

export interface ICommandManager {
  findCommand(commandName: string): CommandEntity | undefined;
  registerCommands({
    url,
    token,
  }: {
    url: string;
    token: string;
  }): Promise<Response>;
}
