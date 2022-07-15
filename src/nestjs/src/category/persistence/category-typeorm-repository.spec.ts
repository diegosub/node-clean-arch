import { SearchQuery } from "@core/node/@shared/domain";
import { CategoryTypeormRepository } from "./category-typeorm-repository";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmSQLITETestingModule } from "../../@typeorm/typeorm.sqlite3.module";

describe("CategoryTypeormRepository Unit Tests", () => {

    let repository: CategoryTypeormRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmSQLITETestingModule()],
            providers: [CategoryTypeormRepository],
        }).compile();

        repository = module.get<CategoryTypeormRepository>(CategoryTypeormRepository);
    });

    it('simple test', async () => {
        const spaceships = await repository.findAll({} as SearchQuery);
    });
});