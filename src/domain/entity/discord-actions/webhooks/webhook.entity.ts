import { Action } from "../../../../shared/types";

type WebhookEntityProps = {
  pathName: string;
  action: Action;
};

export class WebhookEntity {
  private props: WebhookEntityProps;
  constructor(props: WebhookEntityProps) {
    this.props = props;
  }

  get pathName(): string {
    return this.props.pathName;
  }

  get action(): Action {
    return this.props.action;
  }
}
