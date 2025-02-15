import { ICommand } from "../../domain/interface/discord-actions/commands.interface";
import { helloAction } from "../actions/hello.action";

export const HelloCommand: ICommand = {
  name: "hello",
  description: "Hello, world!",
  action: helloAction,
};
