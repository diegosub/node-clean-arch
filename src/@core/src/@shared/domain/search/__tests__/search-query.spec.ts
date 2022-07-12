import { SearchQuery } from "../search-query";

describe("SearchQuery Unit Tests", () => {
    test("page prop", () => {
        const params = new SearchQuery();
        expect(params.page).toBe(1);

        const arrange = [
            { page: null, expected: 1 },
            { page: undefined, expected: 1 },
            { page: "", expected: 1 },
            { page: "fake", expected: 1 },
            { page: 0, expected: 1 },
            { page: -1, expected: 1 },
            { page: 5.5, expected: 1 },
            { page: true, expected: 1 },
            { page: false, expected: 1 },
            { page: {}, expected: 1 },

            { page: 1, expected: 1 },
            { page: 2, expected: 2 },
        ];

        arrange.forEach((i) => {
            expect(new SearchQuery({ page: i.page as any }).page).toBe(i.expected);
        });
    });

    test("perPage prop", () => {
        const params = new SearchQuery();
        expect(params.perPage).toBe(15);

        const arrange = [
            { perPage: null, expected: 15 },
            { perPage: undefined, expected: 15 },
            { perPage: "", expected: 15 },
            { perPage: "fake", expected: 15 },
            { perPage: 0, expected: 15 },
            { perPage: -1, expected: 15 },
            { perPage: 5.5, expected: 15 },
            { perPage: true, expected: 15 },
            { perPage: false, expected: 15 },
            { perPage: {}, expected: 15 },

            { perPage: 1, expected: 1 },
            { perPage: 2, expected: 2 },
            { perPage: 10, expected: 10 },
        ];

        arrange.forEach((i) => {
            expect(new SearchQuery({ perPage: i.perPage as any }).perPage).toBe(
                i.expected
            );
        });
    });

    test("sort prop", () => {
        const params = new SearchQuery();
        expect(params.sort).toBeNull();

        const arrange = [
            { sort: null, expected: null },
            { sort: undefined, expected: null },
            { sort: "", expected: null },
            { sort: 0, expected: "0" },
            { sort: -1, expected: "-1" },
            { sort: 5.5, expected: "5.5" },
            { sort: true, expected: "true" },
            { sort: false, expected: "false" },
            { sort: {}, expected: "[object Object]" },
            { sort: "field", expected: "field" },
        ];

        arrange.forEach((i) => {
            expect(new SearchQuery({ sort: i.sort as any }).sort).toBe(i.expected);
        });
    });

    test("direction prop", () => {
        let params = new SearchQuery();
        expect(params.direction).toBeNull();

        params = new SearchQuery({ sort: null });
        expect(params.direction).toBeNull();

        params = new SearchQuery({ sort: undefined });
        expect(params.direction).toBeNull();

        params = new SearchQuery({ sort: "" });
        expect(params.direction).toBeNull();

        const arrange = [
            { direction: null, expected: "asc" },
            { direction: undefined, expected: "asc" },
            { direction: "", expected: "asc" },
            { direction: 0, expected: "asc" },
            { direction: "fake", expected: "asc" },

            { direction: "asc", expected: "asc" },
            { direction: "ASC", expected: "asc" },
            { direction: "desc", expected: "desc" },
            { direction: "DESC", expected: "desc" },
        ];

        arrange.forEach((i) => {
            expect(
                new SearchQuery({ sort: "field", direction: i.direction as any })
                    .direction
            ).toBe(i.expected);
        });
    });

    test("filter prop", () => {
        const params = new SearchQuery();
        expect(params.filter).toBeNull();

        const arrange = [
            { filter: null, expected: null },
            { filter: undefined, expected: null },
            { filter: "", expected: null },

            { filter: 0, expected: "0" },
            { filter: -1, expected: "-1" },
            { filter: 5.5, expected: "5.5" },
            { filter: true, expected: "true" },
            { filter: false, expected: "false" },
            { filter: {}, expected: "[object Object]" },
            { filter: "field", expected: "field" },
        ];

        arrange.forEach((i) => {
            expect(new SearchQuery({ filter: i.filter as any }).filter).toBe(
                i.expected
            );
        });
    });
});