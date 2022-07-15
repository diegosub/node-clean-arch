import { DataSource } from "typeorm"
import { CategoryModel } from "./category-model";

describe('Category Model Unit Tests', () => {

    // let dataSource: DataSource;

    // beforeAll(() => {

    //     dataSource = new DataSource({
    //         type: "sqlite",
    //         database: "myspace",
    //         entities: [CategoryModel],
    //         synchronize: true,
    //         logging: true,
    //     });

    // });

    // beforeEach(async () => {
    //     await (await dataSource.initialize()).synchronize(true);
    // })

    // afterAll(async () => {
    //     await dataSource.destroy();
    // })

    test('test connection', () => {

    });

});