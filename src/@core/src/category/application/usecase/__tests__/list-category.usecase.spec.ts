import { CategoryOutput } from "../../dto";
import { Category, CategoryRepository } from "../../../domain";
import { Pagination, PaginationProps, SearchQuery } from "../../../../@shared/domain";
import { any, mock, MockProxy } from "jest-mock-extended";
import { ListCategoryUseCase } from "../list-category.usecase";


describe('Unit tests list category usecase', () => {
    let repository: MockProxy<CategoryRepository>;
    let usecase: ListCategoryUseCase;

    beforeEach(() => {
        repository = mock<CategoryRepository>();
        usecase = new ListCategoryUseCase(repository);
    })

    it("list a valids category without search query", async () => {

        var query: SearchQuery = {} as SearchQuery;

        var categories = [
            Category.create("Lazer"),
            Category.create("Viagens")
        ]

        repository.findAll.calledWith(query).mockReturnValueOnce(Promise.resolve(categories));
        let output = await usecase.execute(query);

        expect(output).toBeTruthy();
        expect(output.items).toBeTruthy();
        expect(output.total).toBe(2);
        expect(output.perPage).not.toBeTruthy();
        expect(output.page).not.toBeTruthy();
    })

    it("list valids category with search query", async () => {

        var query: SearchQuery = {
            page: 1,
            perPage: 5,
            sort: 'name',
            direction: 'asc',
            filter: ""
        } as SearchQuery;
        var props = {} as PaginationProps<CategoryOutput>;

        var categories = [
            Category.create("Lazer"),
            Category.create("Viagens")
        ]

        repository.findAll.calledWith(query).mockReturnValueOnce(Promise.resolve(categories));
        let output = await usecase.execute(query);

        expect(output).toBeTruthy();
        expect(output.items).toBeTruthy();
        expect(output.total).toBe(2);
        expect(output.perPage).toBe(5);
        expect(output.page).toBe(1);
    })

    it("list categories when return null", async () => {

        var query: SearchQuery = {
            page: 1,
            perPage: 5,
            sort: 'name',
            direction: 'asc',
            filter: ""
        } as SearchQuery;
        var props = {} as PaginationProps<CategoryOutput>;

        var categories = null;

        repository.findAll.calledWith(query).mockReturnValueOnce(Promise.resolve(categories));
        let output = await usecase.execute(query);

        expect(output).toBeTruthy();
        expect(output.items).toBeTruthy();
        expect(output.total).toBe(0);
        expect(output.perPage).toBe(5);
        expect(output.page).toBe(1);
    })

    it("list categories when return empty", async () => {

        var query: SearchQuery = {
            page: 1,
            perPage: 5,
            sort: 'name',
            direction: 'asc',
            filter: ""
        } as SearchQuery;
        var props = {} as PaginationProps<CategoryOutput>;
        var pagination = new Pagination<CategoryOutput>(props);

        var categories: any[] = [];

        repository.findAll.calledWith(query).mockReturnValueOnce(Promise.resolve(categories));
        let output = await usecase.execute(query);

        expect(output).toBeTruthy();
        expect(output.items).toBeTruthy();
        expect(output.total).toBe(0);
        expect(output.perPage).toBe(5);
        expect(output.page).toBe(1);
    })

    it("list categories when return repository error", async () => {

        var query: SearchQuery = {
            page: 1,
            perPage: 5,
            sort: 'name',
            direction: 'asc',
            filter: ""
        } as SearchQuery;

        var errorExpectedMessage = "Repository error";

        var categories: any[] = [];

        repository.findAll.calledWith(any()).mockRejectedValue(new Error(errorExpectedMessage))
        expect(() => usecase.execute(query)).rejects.toThrow(new Error(errorExpectedMessage));
    })
});