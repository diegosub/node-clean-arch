import { CategoryRepository } from "../../domain";
import { UseCase } from "../../../@shared/application";
import { CategoryMapper, CategoryOutput } from "../dto";


export class DeactivateCategoryUseCase implements UseCase<string, CategoryOutput> {

    constructor(private repository: CategoryRepository) { }

    async execute(id: string): Promise<CategoryOutput> {
        const category = await this.repository.deactivate(id);
        return CategoryMapper.toOutput(category);
    }

}