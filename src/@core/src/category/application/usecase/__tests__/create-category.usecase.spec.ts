import { CreateCategoryInput, CreateCategoryUseCase } from "../../../application";
import { Category, CategoryRepository } from "../../../domain";
import { DomainError } from "../../../../@shared/domain";
import { any, mock, MockProxy } from "jest-mock-extended";


describe('Unit tests create category usecase', () => {
    let repository: MockProxy<CategoryRepository>;
    let usecase: CreateCategoryUseCase;

    beforeEach(() => {
        repository = mock<CategoryRepository>();
        usecase = new CreateCategoryUseCase(repository);
    })

    it("create a valid category", async () => {
        var input = { name: "Lazer" };
        var expectedCategory = Category.create("Lazer");

        repository.insert.calledWith(any()).mockReturnValueOnce(Promise.resolve(expectedCategory));
        let output = await usecase.execute(input);

        expect(output).toBeTruthy();
        expect(output.id).toBeTruthy();
        expect(output.name).toBe("Lazer");
        expect(output.active).toBe(true);
    })

    it("create a invalid category", () => {

        var input = {} as CreateCategoryInput;
        let errorExpectedName = ["'name' é obrigatório"];
        let errorExpectedMessage = "Erro na validação da categoria";

        expect(() => usecase.execute(input)).rejects.toThrow(DomainError.create(errorExpectedMessage, errorExpectedName));
    })

    it("create a category with null name", () => {

        var input = { name: null } as CreateCategoryInput;
        let errorExpectedName = ["'name' é obrigatório"];
        let errorExpectedMessage = "Erro na validação da categoria";

        expect(() => usecase.execute(input)).rejects.toThrow(DomainError.create(errorExpectedMessage, errorExpectedName));
    })

    it("create a category return repository error", () => {

        var errorExpectedMessage = "Repository error";
        var input: CreateCategoryInput = { name: "Lazer" }

        repository.insert.calledWith(any()).mockRejectedValue(new Error(errorExpectedMessage))
        expect(() => usecase.execute(input)).rejects.toThrow(new Error(errorExpectedMessage));

    })


});