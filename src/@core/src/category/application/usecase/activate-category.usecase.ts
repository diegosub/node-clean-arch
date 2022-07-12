import { UseCase } from "../../../@shared/application";
import { CategoryRepository } from "../../domain";
import { CategoryMapper, CategoryOutput } from "../dto";

export class ActivateCategoryUseCase implements UseCase<string, CategoryOutput> {

    constructor(private repository: CategoryRepository) { }

    async execute(id: string): Promise<CategoryOutput> {
        const category = await this.repository.activate(id);
        return CategoryMapper.toOutput(category);
    }

}