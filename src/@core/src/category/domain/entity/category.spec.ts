import { DomainError, Handler } from "../../../@shared/domain";
import { Category } from "./category";



describe("Category Tests", () => {

    test("create valid category", () => {
        var expectedName = "Lazer";
        var expectedAtivo = true;

        const category = Category.create("Lazer");
        category.validate(new Handler());

        expect(category.id).toBeTruthy();
        expect(category.name).toBe(expectedName);
        expect(category.active).toBe(expectedAtivo);
        expect(category.createdAt).toBeTruthy();
        expect(category.createdAt).toBeInstanceOf(Date);
    });

    test("create category with name null", () => {
        var expectedMassage = "Erro na validação da categoria";
        var expectedErrors: string[] = [
            "'name' é obrigatório"
        ];

        var exception = DomainError.create(expectedMassage, expectedErrors)

        const category = Category.create(null);
        expect(() => category.validate(new Handler())).toThrow(exception);
        expect(expectedErrors).toBe(exception.errors);
    });

    test("create category with name empty", () => {
        var expectedMassage = "Erro na validação da categoria";
        var expectedErrors: string[] = [
            "'name' é obrigatório"
        ];

        var exception = DomainError.create(expectedMassage, expectedErrors)

        const category = Category.create("");
        expect(() => category.validate(new Handler())).toThrow(exception);
        expect(expectedErrors).toBe(exception.errors);
    });

    test("create category with name undefined", () => {
        var expectedName = undefined;

        var expectedMassage = "Erro na validação da categoria";
        var expectedErrors: string[] = [
            "'name' é obrigatório"
        ];

        var exception = DomainError.create(expectedMassage, expectedErrors)

        const category = Category.create(expectedName);
        expect(() => category.validate(new Handler())).toThrow(exception);
        expect(expectedErrors).toBe(exception.errors);
    });

    test("create category with name < 3", () => {
        var expectedName = "oi";

        var expectedMassage = "Erro na validação da categoria";
        var expectedErrors: string[] = [
            "'name' deve conter entre 3 e 255 caracteres"
        ];

        var exception = DomainError.create(expectedMassage, expectedErrors)

        const category = Category.create(expectedName);
        expect(() => category.validate(new Handler())).toThrow(exception);
        expect(expectedErrors).toBe(exception.errors);
    });

    test("create category with name > 255", () => {
        var expectedName = "Gostaria de enfatizar que o entendimento das metas propostas deve passar por modificações independentemente dos procedimentos" +
            "normalmente adotados. Percebemos, cada vez mais, que o novo modelo estrutural aqui preconizado garante a contribuição de um grupo" +
            "importante na determinação das novas proposições. Todas estas questões";

        var expectedMassage = "Erro na validação da categoria";
        var expectedErrors: string[] = [
            "'name' deve conter entre 3 e 255 caracteres"
        ];

        const category = Category.create(expectedName);
        expect(() => category.validate(new Handler())).toThrow(DomainError.create(expectedMassage, expectedErrors));
    });

    it("update a category", () => {
        var expectedName = "Viagens";
        const category = Category.create("Lazer");

        category.update(expectedName);
        category.validate(new Handler());

        expect(category.name).toBe(expectedName);
        expect(category.active).toBe(true);
        expect(category.createdAt).toBeTruthy();
        expect(category.updatedAt).toBeTruthy();
    });

    it("activate and deactivate a category", () => {
        const category = Category.create("Lazer");
        category.deactivate();
        expect(category.active).toBe(false);
        expect(category.createdAt).toBeTruthy();
        expect(category.updatedAt).toBeTruthy();
        expect(category.deletedAt).toBeTruthy();

        category.activate();
        expect(category.active).toBe(true);
        expect(category.createdAt).toBeTruthy();
        expect(category.updatedAt).toBeTruthy();
        expect(category.deletedAt).not.toBeTruthy();
    });
});