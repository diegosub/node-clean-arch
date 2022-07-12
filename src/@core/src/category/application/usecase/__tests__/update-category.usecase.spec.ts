
import { UpdateCategoryInput, UpdateCategoryUseCase } from '../../../application';
import { Category, CategoryRepository } from '../../../domain';
import { DomainError, NotFoundError } from '../../../../@shared/domain';
import { any, mock, MockProxy } from 'jest-mock-extended';

describe('Unit tests update category usecase', () => {
    let repository: MockProxy<CategoryRepository>;
    let usecase: UpdateCategoryUseCase;

    beforeEach(() => {
        repository = mock<CategoryRepository>();
        usecase = new UpdateCategoryUseCase(repository);
    })

    it("update a valid category", async () => {

        var expectedCategory = Category.create("Viagens");
        var category = Category.create("Lazer");

        var input = {
            id: "uuid",
            name: "Viagens"
        } as UpdateCategoryInput;

        repository.getById.calledWith(input.id).mockReturnValueOnce(Promise.resolve(category));
        repository.update.calledWith(any()).mockReturnValueOnce(Promise.resolve(expectedCategory));
        let output = await usecase.execute(input);

        expect(output).toBeTruthy();
        expect(output.id).toBeTruthy();
        expect(output.name).toBe("Viagens");
        expect(output.active).toBe(true);
    })

    it("update a invalid category", () => {

        var category = Category.create("Lazer");
        var input = {} as UpdateCategoryInput;
        let errorExpectedName = ["'name' é obrigatório"];
        let errorExpectedMessage = "Erro na validação da categoria";

        repository.getById.calledWith(input.id).mockReturnValueOnce(Promise.resolve(category));

        expect(() => usecase.execute(input)).rejects.toThrow(DomainError.create(errorExpectedMessage, errorExpectedName));
    })

    it("create a category with null name", () => {

        var category = Category.create("Lazer");
        var input = { name: null } as UpdateCategoryInput;
        let errorExpectedName = ["'name' é obrigatório"];
        let errorExpectedMessage = "Erro na validação da categoria";

        repository.getById.calledWith(input.id).mockReturnValueOnce(Promise.resolve(category));

        expect(() => usecase.execute(input)).rejects.toThrow(DomainError.create(errorExpectedMessage, errorExpectedName));
    })

    it("create a category return repository error", () => {

        var errorExpectedMessage = "Repository error";
        var input: UpdateCategoryInput = { id: "uuid", name: "Lazer" }

        repository.getById.calledWith(any()).mockRejectedValue(new Error(errorExpectedMessage))
        expect(() => usecase.execute(input)).rejects.toThrow(new Error(errorExpectedMessage));

    })

    it("update a category with a invalid id", () => {

        var category = Category.create("Lazer");
        var input = { id: "uuid", name: "Viagens" } as UpdateCategoryInput;
        let errorExpectedMessage = "Categoria não encontrada";

        repository.getById.calledWith(input.id).mockReturnValueOnce(Promise.resolve(null));
        expect(() => usecase.execute(input)).rejects.toThrow(NotFoundError.create(errorExpectedMessage));
    })
});