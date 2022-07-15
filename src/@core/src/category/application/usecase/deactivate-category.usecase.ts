import { CategoryRepository } from "../../domain";
import { UseCase } from "../../../@shared/application";
import { CategoryMapper, CategoryOutput } from "../dto";
import { NotFoundError } from "../../../@shared/domain";


export class DeactivateCategoryUseCase implements UseCase<string, CategoryOutput> {

    constructor(private repository: CategoryRepository) { }

    async execute(id: string): Promise<CategoryOutput> {
        const category = await this.repository.getById(id);
        if (!category) {
            throw NotFoundError.create("Categoria não encontrada");
        }

        category.deactivate();
        await this.repository.update(category)
        return CategoryMapper.toOutput(category);
    }

}