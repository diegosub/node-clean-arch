import { mock, MockProxy } from 'jest-mock-extended';
import { Category, CategoryRepository } from '../../../domain';
import { DeactivateCategoryUseCase } from '../../../application';

describe('Unit tests deactivate category usecase', () => {
    let repository: MockProxy<CategoryRepository>;
    let usecase: DeactivateCategoryUseCase;

    beforeEach(() => {
        repository = mock<CategoryRepository>();
        usecase = new DeactivateCategoryUseCase(repository);
    })

    it("deactivate a category", async () => {

        var id = "uuid";
        var category = Category.create("Viagens");
        category.deactivate();

        repository.deactivate.calledWith(id).mockReturnValueOnce(Promise.resolve(category));
        let output = await usecase.execute(id);

        expect(output).toBeTruthy();
        expect(output.id).toBeTruthy();
        expect(output.name).toBe("Viagens");
        expect(output.active).toBe(false);
    })

    it("deactivate a category when return a repository exception", () => {

        var id = "uuid";
        var errorExpectedMessage = "Repository error";

        repository.deactivate.calledWith(id).mockRejectedValue(new Error(errorExpectedMessage))
        expect(() => usecase.execute(id)).rejects.toThrow(new Error(errorExpectedMessage));
    })
});