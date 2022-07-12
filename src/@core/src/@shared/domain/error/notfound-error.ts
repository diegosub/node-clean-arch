import { DomainError } from "./domain-error";

export class NotFoundError extends DomainError {
    protected constructor(
        aMessage: string,
        anErrors?: string[]
    ) {
        super(aMessage, anErrors, "NotFound");
    }

    static create(aMessage: string, anErrors?: string[]): DomainError {
        return new NotFoundError(aMessage, anErrors);
    }
}