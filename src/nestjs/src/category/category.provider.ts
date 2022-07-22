import { ActivateCategoryUseCase, CreateCategoryUseCase, DeactivateCategoryUseCase, GetCategoryUseCase, ListCategoryUseCase, UpdateCategoryUseCase } from '@core/node/category/application';
import { CategoryRepository } from '@core/node/category/domain';
import { CategoryModel, CategoryTypeormRepository } from '@core/node/category/infrastructure';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export namespace CATEGORY_PROVIDERS {
    export namespace REPOSITORIES {
        export const CATEGORY_REPOSITORY = {
            provide: CategoryTypeormRepository,
            useFactory: (dataSource: DataSource) => {
                return new CategoryTypeormRepository(dataSource.getRepository(CategoryModel));
            },
            inject: [getDataSourceToken()],
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

        export const ACTIVATE_CATEGORY_USE_CASE = {
            provide: ActivateCategoryUseCase,
            useFactory: (repository: CategoryRepository) => {
                return new ActivateCategoryUseCase(repository);
            },
            inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
        };

        export const DEACTIVATE_CATEGORY_USE_CASE = {
            provide: DeactivateCategoryUseCase,
            useFactory: (repository: CategoryRepository) => {
                return new DeactivateCategoryUseCase(repository);
            },
            inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
        };
    }
}