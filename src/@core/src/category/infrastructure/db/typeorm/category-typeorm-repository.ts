import { Like, Repository } from "typeorm";
import { Pagination, PaginationProps, SearchQuery } from "../../../../@shared/domain";
import { Category, CategoryRepository } from "../../../../category/domain";
import { CategoryMapper } from "./category-mapper";
import { CategoryModel } from "./category-model";

export class CategoryTypeormRepository implements CategoryRepository {

    constructor(
        @Injec
        private repository: Repository<CategoryModel>
    ) { }

    async insert(category: Category): Promise<Category> {
        return this._save(category);
    }

    async update(category: Category): Promise<Category> {
        return this._save(category);
    }

    async getById(id: string): Promise<Category> {
        const _id = `${id}`;
        const model = await this.repository.findOneBy({ 'id': _id });
        return CategoryMapper.toDomain(model);
    }

    async findAll(query: SearchQuery): Promise<Pagination<Category>> {

        const [result, total] = await this.repository.findAndCount({
            where: { name: Like('%' + query.filter + '%') },
            order: { name: query.direction },
            take: query.perPage,
            skip: query.page
        });


        const props: PaginationProps<Category> = {
            items: result.map(item => CategoryMapper.toDomain(item)),
            total: total,
            page: query.page,
            perPage: query.perPage
        }

        return new Pagination<Category>(props);
    }

    private async _save(category: Category) {
        var model = CategoryMapper.toModel(category);
        model = await this.repository.save(model);
        return CategoryMapper.toDomain(model);
    }

}