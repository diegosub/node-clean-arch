import { ActivateCategoryUseCase } from '../../../application';
import { Category, CategoryRepository } from '../../../domain';
import { any, mock, MockProxy } from 'jest-mock-extended';


describe('Unit tests activate category usecase', () => {
    let repository: MockProxy<CategoryRepository>;
    let usecase: ActivateCategoryUseCase;

    beforeEach(() => {
        repository = mock<CategoryRepository>();
        usecase = new ActivateCategoryUseCase(repository);
    })

    test("activate a category", async () => {

        var id = "uuid";
        var activeCategory = Category.create("Viagens");
        var inactiveCategory = Category.create("Viagens");
        inactiveCategory.deactivate();

        repository.getById.calledWith(any()).mockReturnValueOnce(Promise.resolve(inactiveCategory));
        repository.update.calledWith(any()).mockReturnValueOnce(Promise.resolve(activeCategory));
        let output = await usecase.execute(id);

        expect(output).toBeTruthy();
        expect(output.id).toBeTruthy();
        expect(output.name).toBe("Viagens");
        expect(output.active).toBe(true);
    })

    test("activate a category when return a repository exception", () => {

        var id = "uuid";
        var errorExpectedMessage = "Repository error";

        repository.getById.calledWith(id).mockRejectedValue(new Error(errorExpectedMessage))
        expect(() => usecase.execute(id)).rejects.toThrow(new Error(errorExpectedMessage));
    })

});