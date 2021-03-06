import { NotFoundError } from "../../../@shared/domain";
import { UseCase } from "../../../@shared/application";
import { CategoryRepository } from "../../domain";
import { CategoryMapper, CategoryOutput } from "../dto";

export class ActivateCategoryUseCase implements UseCase<string, CategoryOutput> {

    constructor(private repository: CategoryRepository) { }

    async execute(id: string): Promise<CategoryOutput> {
        const category = await this.repository.getById(id);
        if (!category) {
            throw NotFoundError.create("Categoria não encontrada");
        }

        category.activate();
        await this.repository.update(category)
        return CategoryMapper.toOutput(category);
    }

}