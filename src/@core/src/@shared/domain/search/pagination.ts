export type PaginationProps<T> = {
    items: T[];
    total: number;
    page: number;
    perPage: number;
};

export class Pagination<T> {
    private readonly _items: T[];
    private readonly _total: number;
    private readonly _page: number;
    private readonly _perPage: number;

    constructor(props: PaginationProps<T>) {
        this._items = props.items;
        this._total = props.total;
        this._page = props.page;
        this._perPage = props.perPage;
    }

    toJSON() {
        return {
            items: this.items,
            total: this.total,
            page: this.page,
            perPage: this.perPage
        };
    }

    get items() {
        return this._items;
    }

    get total() {
        return this._total;
    }

    get page() {
        return this._page;
    }

    get perPage() {
        return this._perPage;
    }

}