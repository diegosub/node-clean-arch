import { CreateCategoryUseCase, GetCategoryUseCase, ListCategoryUseCase, UpdateCategoryUseCase } from '@core/node/category/application';
import { CategoryRepository } from '@core/node/category/domain';
import { CategoryTypeormRepository } from '@core/node/category/infrastructure';

export namespace CATEGORY_PROVIDERS {
    export namespace REPOSITORIES {
        export const CATEGORY_REPOSITORY = {
            provide: 'CategoryRepository',
            useClass: CategoryTypeormRepository,
        };
    }

    export namespace USE_CASES {
        export const CREATE_CATEGORY_USE_CASE = {
            provide: CreateCategoryUseCase,
            useFactory: (repository: CategoryRepository) => {
                return new CreateCategoryUseCase(repository);
            },
            inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
        };

        export const UPDATE_CATEGORY_USE_CASE = {
            provide: UpdateCategoryUseCase,
            useFactory: (repository: CategoryRepository) => {
                return new UpdateCategoryUseCase(repository);
            },
            inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
        };

        export const LIST_CATEGORIES_USE_CASE = {
            provide: ListCategoryUseCase,
            useFactory: (repository: CategoryRepository) => {
                return new ListCategoryUseCase(repository);
            },
            inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
        };

        export const GET_CATEGORY_USE_CASE = {
            provide: GetCategoryUseCase,
            useFactory: (repository: CategoryRepository) => {
                return new GetCategoryUseCase(repository);
            },
            inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
        };
    }
}