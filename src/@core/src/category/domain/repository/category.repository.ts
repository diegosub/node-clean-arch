import { Identifier, Pagination, SearchQuery } from "../../../@shared/domain";
import { Category } from "../entity";


export interface CategoryRepository {

    insert(category: Category): Promise<Category>;
    update(category: Category): Promise<Category>;
    getById(id: string | Identifier): Promise<Category>;
    findAll(query: SearchQuery): Promise<Pagination<Category>>;

}