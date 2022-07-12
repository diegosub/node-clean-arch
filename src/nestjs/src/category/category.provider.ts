import { CategoryRepository } from '@core/node/category/domain'

export namespace CATEGORY_PROVIDERS {
    export namespace REPOSITORIES {
        export const CATEGORY_REPOSITORY = {
            provide: 'CategoryRepository',
            useClass: CategoryRepository,
        };
    }