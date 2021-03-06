import { Entity, Handler, Identifier } from "../../../@shared/domain";
import { CategoryValidator } from "./category-validator";


export type CategoryProperties = {
    name: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
};

export class Category extends Entity<CategoryProperties> {

    private constructor(
        public readonly props: CategoryProperties,
        id?: Identifier
    ) {
        super(props, id);
    }

    static create(name: string) {
        const props = {
            name: name,
            active: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        return new Category(props);
    }

    validate(handler: Handler) {
        new CategoryValidator(this, handler).validate();
    }

    update(name: string) {
        this.props.name = name;
        this.props.updatedAt = new Date();
    }

    activate() {
        if (!this.props.active) {
            this.props.active = true;
            this.props.updatedAt = new Date();
            this.props.deletedAt = null;
        }
    }

    deactivate() {
        if (this.props.active) {
            this.props.active = false;
            this.props.deletedAt = new Date();
        }
    }

    static with(id: string, name: string, active: boolean, createdAt: Date, updatedAt: Date, deletedAt: Date) {
        return new Category({ name, active, createdAt, updatedAt, deletedAt }, Identifier.create(id));
    }

    get name() {
        return this.props.name;
    }

    get active() {
        return this.props.active;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }

    get deletedAt() {
        return this.props.deletedAt;
    }
}    