import { any, mock, MockProxy } from 'jest-mock-extended';
import { NotFoundError } from '../../../../@shared/domain/error/notfound-error';
import { Category } from '../../../domain/entity/category';
import { CategoryRepository } from '../../../domain/repository/category.repository';
import { GetCategoryUseCase } from '../get-category.usecase';

describe('Unit tests get category usecase', () => {
    let repository: MockProxy<CategoryRepository>;
    let usecase: GetCategoryUseCase;

    beforeEach(() => {
        repository = mock<CategoryRepository>();
        usecase = new GetCategoryUseCase(repository);
    })

    it("get a valid category", async () => {

        var id = "uuid";
        var category = Category.create("Lazer");

        repository.getById.calledWith(id).mockReturnValueOnce(Promise.resolve(category));
        let output = await usecase.execute(id);

        expect(output).toBeTruthy();
        expect(output.id).toBeTruthy();
        expect(output.name).toBe("Lazer");
        expect(output.active).toBe(true);
    })

    it("get a invalid with invalid id", () => {

        var id = "uuid";
        var errorExpectedMessage = "Categoria não encontrada";

        repository.getById.calledWith(id).mockReturnValueOnce(Promise.resolve(null));
        expect(() => usecase.execute(id)).rejects.toThrow(NotFoundError.create(errorExpectedMessage));
    })

    it("get a invalid with null id", () => {

        var errorExpectedMessage = "Categoria não encontrada";

        repository.getById.calledWith(null).mockReturnValueOnce(Promise.resolve(null));
        expect(() => usecase.execute(null)).rejects.toThrow(NotFoundError.create(errorExpectedMessage));
    })

    it("get a category return repository error", () => {

        var errorExpectedMessage = "Repository error";
        var id = "uuid";

        repository.getById.calledWith(any()).mockRejectedValue(new Error(errorExpectedMessage))
        expect(() => usecase.execute(id)).rejects.toThrow(new Error(errorExpectedMessage));

    })
});