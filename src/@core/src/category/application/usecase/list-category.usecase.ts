import { CategoryRepository } from "../../domain";
import { UseCase } from "../../../@shared/application";
import { Pagination, SearchQuery } from "../../../@shared/domain";
import { CategoryMapper, CategoryOutput } from "../dto";


export class ListCategoryUseCase implements UseCase<SearchQuery, Pagination<CategoryOutput>> {

    constructor(private repository: CategoryRepository) { }

    async execute(query: SearchQuery): Promise<Pagination<CategoryOutput>> {
        const categories = await this.repository.findAll(query);

        var items: any[] = [];

        if (categories && categories.items.length > 0) {
            items = categories.items.map(item => {
                return CategoryMapper.toOutput(item);
            });
        }

        var props = {
            items: items,
            total: items.length,
            page: query.page,
            perPage: query.perPage
        }

        return new Pagination<CategoryOutput>(props)
    }

}