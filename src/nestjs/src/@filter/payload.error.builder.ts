import { DomainError } from '@core/node/@shared/domain';
import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';

type PayloadError = {
    status: number;
    type: string;
    message: string;
    errors: string[];
    timestamp: Date;
}

enum ErrorType {
    DADOS_INVALIDOS = "Dados inválidos",
    ERRO_DE_SISTEMA = "Erro de sistema",
    PARAMETRO_INVALIDO = "Parâmetro inválido",
    MENSAGEM_INCOMPREENSIVEL = "Mensagem incompreensível",
    RECURSO_NAO_ENCONTRADO = "Recurso não encontrado",
    ENTIDADE_EM_USO = "Entidade em uso",
    ERRO_NEGOCIO = "Violação de regra de negócio",
    ERRO_AUTENTICACAO = "Erro de autenticação"
}

export class PayloadErrorBuilder {

    error: Error;
    MSG_GENERICA = "Ocorreu um erro inesperado no sistema. Tente novamente e se o problema persistir, entre em contato com um administrador.";
    MSG_SEM_AUTORIZACAO = "Você não tem autorização para realizar esta operação.";
    MSG_DADOS_INVALIDOS = "Um ou mais campos estão inválidos. Faça o preenchimento correto e tente novamente.";

    constructor(error: Error) {
        this.error = error;
    }

    build(): PayloadError {

        if (this.error instanceof BadRequestException) {
            const response: any = this.error.getResponse();
            return this.createPayloadError(this.error.getStatus(),
                ErrorType.DADOS_INVALIDOS,
                this.MSG_DADOS_INVALIDOS,
                response.message);
        } else {
            if (this.error instanceof UnauthorizedException) {
                const response: any = this.error.getResponse();
                return this.createPayloadError(this.error.getStatus(),
                    ErrorType.ERRO_AUTENTICACAO,
                    this.MSG_SEM_AUTORIZACAO);
            } else {
                if (this.error instanceof NotFoundException) {
                    const response: any = this.error.getResponse();
                    return this.createPayloadError(this.error.getStatus(),
                        ErrorType.RECURSO_NAO_ENCONTRADO,
                        response.message);
                } else {
                    if (this.error instanceof DomainError) {
                        return this.createPayloadError(400,
                            ErrorType.ERRO_NEGOCIO,
                            this.error.message,
                            this.error.errors);
                    } else {
                        return this.createPayloadError(500,
                            ErrorType.ERRO_DE_SISTEMA,
                            this.MSG_GENERICA);
                    }
                }
            }
        }
    }

    createPayloadError(status: number, type: string, message: string, errors?: string[]): PayloadError {

        const payload: PayloadError = {
            status: status,
            type: type,
            message: message,
            errors: errors,
            timestamp: new Date()
        };

        return payload;

    }
}