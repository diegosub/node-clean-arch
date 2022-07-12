import { Category, CategoryRepository } from "../../domain";
import { UseCase } from "../../../@shared/application";
import { Handler } from "../../../@shared/domain";
import { CategoryMapper, CategoryOutput, CreateCategoryInput } from "../dto";


export class CreateCategoryUseCase implements UseCase<CreateCategoryInput, CategoryOutput> {

    constructor(private repository: CategoryRepository) { }

    async execute(input: CreateCategoryInput): Promise<CategoryOutput> {
        const category = Category.create(input.name);
        category.validate(new Handler());
        await this.repository.insert(category)
        return CategoryMapper.toOutput(category);
    }

}