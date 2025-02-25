import { Action } from "@/shared/types";

type WebhookEntityProps = {
  pathName: string;
  description: string;
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

  get description(): string {
    return this.props.description;
  }
}
