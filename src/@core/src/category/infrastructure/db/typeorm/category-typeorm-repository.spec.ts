import { Category } from "../../../domain";
import { DataSource } from "typeorm";
import { CategoryModel } from "./category-model";
import { CategoryTypeormRepository } from "./category-typeorm-repository";

describe('Unit/Integration Test Category repository', () => {

    let dataSource: DataSource;
    let repository: CategoryTypeormRepository;

    beforeAll(() => {

        dataSource = new DataSource({
            type: "sqlite",
            database: "myspace",
            entities: [CategoryModel],
            synchronize: true,
            logging: true,
        });

    });

    beforeEach(async () => {
        await (await dataSource.initialize()).synchronize(true);
        repository = new CategoryTypeormRepository();
    })

    afterAll(async () => {
        await dataSource.destroy();
    })


    it('should insert a new entity', async () => {

        let category = Category.create('Lazer');
        await repository.insert(category);

        const result = await repository.getById(category.id);

        expect(result).toBeTruthy();
        expect(result.id).toBe(category.id);

    })

})