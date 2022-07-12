import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ActivateCategoryUseCase, CreateCategoryInput, CreateCategoryUseCase, DeactivateCategoryUseCase, GetCategoryUseCase, ListCategoryUseCase, UpdateCategoryInput, UpdateCategoryUseCase } from '@core/node/category/application';

@Controller('category')
export class CategoryController {

  @Inject(CreateCategoryUseCase)
  private createUseCase: CreateCategoryUseCase;

  @Inject(UpdateCategoryUseCase)
  private updateUseCase: UpdateCategoryUseCase;

  @Inject(GetCategoryUseCase)
  private getUseCase: GetCategoryUseCase;

  @Inject(ListCategoryUseCase)
  private listUseCase: ListCategoryUseCase;

  @Inject(ActivateCategoryUseCase)
  private activateUseCase: ActivateCategoryUseCase;

  @Inject(DeactivateCategoryUseCase)
  private deactivateUseCase: DeactivateCategoryUseCase;

  @Post()
  create(@Body() input: CreateCategoryInput) {
    return this.createUseCase.execute(input);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() input: UpdateCategoryInput) {
    input.id = id;
    return this.updateUseCase.execute(input);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.categoryService.remove(+id);
  // }
}
