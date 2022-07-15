import { any, mock, MockProxy } from 'jest-mock-extended';
import { Category, CategoryRepository } from '../../../domain';
import { DeactivateCategoryUseCase } from '../deactivate-category.usecase';

describe('Unit tests deactivate category usecase', () => {
    let repository: MockProxy<CategoryRepository>;
    let usecase: DeactivateCategoryUseCase;

    beforeEach(() => {
        repository = mock<CategoryRepository>();
        usecase = new DeactivateCategoryUseCase(repository);
    })

    it("deactivate a category", async () => {

        var id = "uuid";
        var activeCategory = Category.create("Viagens");
        var inactiveCategory = Category.create("Lazer");
        inactiveCategory.deactivate();

        repository.getById.calledWith(any()).mockReturnValueOnce(Promise.resolve(activeCategory));
        repository.update.calledWith(any()).mockReturnValueOnce(Promise.resolve(inactiveCategory));
        let output = await usecase.execute(id);

        expect(output).toBeTruthy();
        expect(output.id).toBeTruthy();
        expect(output.name).toBe("Viagens");
        expect(output.active).toBe(false);
    })

    it("deactivate a category when return a repository exception", () => {

        var id = "uuid";
        var errorExpectedMessage = "Repository error";

        repository.getById.calledWith(id).mockRejectedValue(new Error(errorExpectedMessage))
        expect(() => usecase.execute(id)).rejects.toThrow(new Error(errorExpectedMessage));
    })
});