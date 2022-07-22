import { ActivateCategoryUseCase, CreateCategoryUseCase, DeactivateCategoryUseCase, GetCategoryUseCase, ListCategoryUseCase, UpdateCategoryUseCase } from '@core/node/category/application';
import { CategoryRepository } from '@core/node/category/domain';
import { CategoryModel, CategoryTypeormRepository } from '@core/node/category/infrastructure';
import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm/data-source/DataSource';
import { CategoryController } from './category.controller';
import { CATEGORY_PROVIDERS } from './category.provider';

@Module({
    imports: [TypeOrmModule.forFeature([CategoryModel])],
    controllers: [CategoryController],
    providers: [
        ...Object.values(CATEGORY_PROVIDERS.REPOSITORIES),
        ...Object.values(CATEGORY_PROVIDERS.USE_CASES)
    ]
})
export class CategoryModule { }
