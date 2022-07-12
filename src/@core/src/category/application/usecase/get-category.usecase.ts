import { CategoryRepository } from "../../domain";
import { UseCase } from "../../../@shared/application";
import { NotFoundError } from "../../../@shared/domain";
import { CategoryMapper, CategoryOutput } from "../dto";


export class GetCategoryUseCase implements UseCase<string, CategoryOutput> {

    constructor(private repository: CategoryRepository) { }

    async execute(id: string): Promise<CategoryOutput> {
        const category = await this.repository.getById(id);
        if (!category) {
            throw NotFoundError.create("Categoria não encontrada");
        }
        return CategoryMapper.toOutput(category);
    }

}