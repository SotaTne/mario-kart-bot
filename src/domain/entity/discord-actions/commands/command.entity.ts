import { Action } from "../../../../shared/types";

type CommandEntityProps = {
  name: string;
  description: string;
  action: Action;
};

export class CommandEntity {
  private props: CommandEntityProps;
  constructor(props: CommandEntityProps) {
    this.props = props;
  }
  get name(): string {
    return this.props.name;
  }
  get description(): string {
    return this.props.description;
  }
  get action(): Action {
    return this.props.action;
  }
}
