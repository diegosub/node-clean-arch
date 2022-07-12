export class DomainError extends Error {

    private _errors: string[];

    protected constructor(
        private readonly aMessage: string,
        private readonly anErrors?: any,
        private readonly aName?: string
    ) {
        super(aMessage);
        this._errors = anErrors;
        this.name = aName || "DomainError";
    }

    static create(aMessage: string, anErrors?: string[]): DomainError {
        return new DomainError(aMessage, anErrors);
    }

    get errors() {
        return this._errors;
    }
}
