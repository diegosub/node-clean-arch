import { Category } from "../../domain";

export class CategoryOutput {
    id: string;
    name: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export class CreateCategoryInput {
    name: string
}

export class UpdateCategoryInput {
    id: string;
    name: string;
}

export class CategoryMapper {
    static toOutput(entity: Category): CategoryOutput {
        return entity.toJSON();
    }
}