import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CATEGORY_PROVIDERS } from './category.provider';

@Module({
  controllers: [CategoryController],
  providers: [
    ...Object.values(CATEGORY_PROVIDERS.REPOSITORIES),
    ...Object.values(CATEGORY_PROVIDERS.USE_CASES),
  ]
})
export class CategoryModule { }
