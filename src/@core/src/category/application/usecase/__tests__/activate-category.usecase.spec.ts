import { ActivateCategoryUseCase } from '../../../application';
import { Category, CategoryRepository } from '../../../domain';
import { mock, MockProxy } from 'jest-mock-extended';


describe('Unit tests activate category usecase', () => {
    let repository: MockProxy<CategoryRepository>;
    let usecase: ActivateCategoryUseCase;

    beforeEach(() => {
        repository = mock<CategoryRepository>();
        usecase = new ActivateCategoryUseCase(repository);
    })

    it("activate a category", async () => {

        var id = "uuid";
        var activeCategory = Category.create("Viagens");

        repository.activate.calledWith(id).mockReturnValueOnce(Promise.resolve(activeCategory));
        let output = await usecase.execute(id);

        expect(output).toBeTruthy();
        expect(output.id).toBeTruthy();
        expect(output.name).toBe("Viagens");
        expect(output.active).toBe(true);
    })

    it("activate a category when return a repository exception", () => {

        var id = "uuid";
        var errorExpectedMessage = "Repository error";

        repository.activate.calledWith(id).mockRejectedValue(new Error(errorExpectedMessage))
        expect(() => usecase.execute(id)).rejects.toThrow(new Error(errorExpectedMessage));
    })

});