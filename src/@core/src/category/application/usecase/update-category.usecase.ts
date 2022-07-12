import { CategoryRepository } from "../../domain";
import { UseCase } from "../../../@shared/application";
import { CategoryMapper, CategoryOutput, UpdateCategoryInput } from "../dto";
import { Handler, NotFoundError } from "../../../@shared/domain";


export class UpdateCategoryUseCase implements UseCase<UpdateCategoryInput, CategoryOutput> {

    constructor(private repository: CategoryRepository) { }

    async execute(input: UpdateCategoryInput): Promise<CategoryOutput> {
        const category = await this.repository.getById(input.id);
        if (!category) {
            throw NotFoundError.create("Categoria não encontrada");
        }
        category.update(input.name);
        category.validate(new Handler());
        await this.repository.update(category)
        return CategoryMapper.toOutput(category);
    }

}