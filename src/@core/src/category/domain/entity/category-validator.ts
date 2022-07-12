import { DomainError, Handler } from "../../../@shared/domain";
import { Category } from "./category";


export abstract class Validator {
    private readonly _handler: Handler;

    protected constructor(readonly aHandler: Handler) {
        this._handler = aHandler;
    }

    public abstract validate(): void;

    get handler() {
        return this._handler;
    }
}

export class CategoryValidator extends Validator {

    private readonly _category: Category;

    private MIN_NOME_LENGTH: number = 3;
    private MAX_NOME_LENGTH: number = 255;

    private MSG_ERRO_VALIDACAO: string = "Erro na validação da categoria";

    constructor(
        aCategory: Category,
        aHandler: Handler
    ) {
        super(aHandler);
        this._category = aCategory;
    }

    public validate(): void {
        this.validateName();
    }

    private validateName(): void {
        const name = this._category.name;

        if (!name) {
            this.handler.append("'name' é obrigatório");
        }

        if (name && (name.trim().length > this.MAX_NOME_LENGTH || name.trim().length < this.MIN_NOME_LENGTH)) {
            this.handler.append("'name' deve conter entre 3 e 255 caracteres");
        }

        if (this.handler.errors && this.handler.errors.length > 0) {
            throw DomainError.create(this.MSG_ERRO_VALIDACAO, this.handler.errors);
        }
    }
}