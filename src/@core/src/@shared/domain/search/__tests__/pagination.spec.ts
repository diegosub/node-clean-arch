import { Pagination } from "../pagination";

describe("Pagination Unit Tests", () => {
    it("constructor props", () => {

        let result = new Pagination({
            items: ["entity1", "entity2"] as any,
            total: 4,
            page: 1,
            perPage: 2
        });

        expect(result.toJSON()).toStrictEqual({
            items: ["entity1", "entity2"] as any,
            total: 4,
            page: 1,
            perPage: 2
        });

        result = new Pagination({
            items: ["entity1", "entity2"] as any,
            total: 4,
            page: 1,
            perPage: 2
        });

        expect(result.toJSON()).toStrictEqual({
            items: ["entity1", "entity2"] as any,
            total: 4,
            page: 1,
            perPage: 2
        });
    });
});
