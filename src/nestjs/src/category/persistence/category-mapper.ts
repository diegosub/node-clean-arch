import { Category } from "@core/node/category/domain";
import { CategoryModel } from "./category-model";

export class CategoryMapper {

    static toModel(category: Category) {
        var categoryModel = new CategoryModel();
        categoryModel.id = category.id;
        categoryModel.name = category.id;
        categoryModel.active = category.active;
        categoryModel.createdAt = category.createdAt;
        categoryModel.updatedAt = category.updatedAt;
        categoryModel.deletedAt = category.deletedAt;

        return categoryModel;
    }

    static toDomain(model: CategoryModel) {
        return Category.with(
            model.id,
            model.name,
            model.active,
            model.createdAt,
            model.updatedAt,
            model.deletedAt
        );
    }
}