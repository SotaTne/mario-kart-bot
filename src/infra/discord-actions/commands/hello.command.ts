import { CommandEntity } from "@/domain/entity/discord-actions/commands/command.entity";
import { helloAction } from "../actions/hello.action";

export const HelloCommand: CommandEntity = new CommandEntity({
  name: "hello",
  description: "Says hello",
  action: helloAction,
});
