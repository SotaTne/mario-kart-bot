type UpdateOptionEntityProps = {
  name: string;
  isUse: boolean;
};

export class UpdateOptionEntity {
  private props: UpdateOptionEntityProps;
  constructor(props: UpdateOptionEntityProps) {
    this.props = props;
  }

  get name(): string {
    return this.props.name;
  }

  get isUse(): boolean {
    return this.props.isUse;
  }
}
