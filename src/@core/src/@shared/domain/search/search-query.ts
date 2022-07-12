export type SortDirection = "asc" | "desc";

export type SearchProps = {
    page?: number;
    perPage?: number;
    sort?: string | null;
    direction?: SortDirection | null;
    filter?: string | null;
}

export class SearchQuery {
    protected _page: number;
    protected _perPage: number = 15;
    protected _sort: string | null;
    protected _direction: SortDirection | null;
    protected _filter: string | null;

    constructor(readonly props: SearchProps = {}) {
        this.page = props.page;
        this.perPage = props.perPage;
        this.sort = props.sort;
        this.direction = props.direction;
        this.filter = props.filter;
    }

    get page() {
        return this._page;
    }

    private set page(value: number) {
        let _page = +value;

        if (Number.isNaN(_page) || _page <= 0 || parseInt(_page as any) !== _page) {
            _page = 1;
        }

        this._page = _page;
    }

    get perPage() {
        return this._perPage;
    }

    private set perPage(value: number) {
        let _perPage = value === (true as any) ? this._perPage : +value;

        if (
            Number.isNaN(_perPage) ||
            _perPage <= 0 ||
            parseInt(_perPage as any) !== _perPage
        ) {
            _perPage = this._perPage;
        }

        this._perPage = _perPage;
    }

    get sort(): string | null {
        return this._sort;
    }

    private set sort(value: string | null) {
        this._sort =
            value === null || value === undefined || value === "" ? null : `${value}`;
    }

    get direction(): SortDirection | null {
        return this._direction;
    }

    private set direction(value: string | null) {
        if (!this.sort) {
            this._direction = null;
            return;
        }
        const dir = `${value}`.toLowerCase();
        this._direction = dir !== "asc" && dir !== "desc" ? "asc" : dir;
    }

    get filter(): string | null {
        return this._filter;
    }

    private set filter(value: string | null) {
        this._filter =
            value === null || value === undefined || (value as unknown) === ""
                ? null
                : (`${value}` as any);
    }
}