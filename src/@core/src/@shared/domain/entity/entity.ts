import { Identifier } from '../vo/identifier';

export abstract class Entity<Props = any> {
  public readonly identifier: Identifier;

  constructor(readonly props: Props, id?: Identifier) {
    this.identifier = id || Identifier.create();
  }

  get id(): string {
    return this.identifier.value;
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this.id,
      ...this.props,
    } as Required<{ id: string } & Props>;
  }
}

export default Entity;