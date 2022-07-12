export class Handler {

    private _errors: string[];

    constructor() {
        this._errors = [];
    }

    append(error: string): void {
        this._errors.push(error);
    }

    get errors(): string[] {
        return this._errors;
    }

}