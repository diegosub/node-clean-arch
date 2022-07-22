import { SearchQuery } from '@core/node/@shared/domain';
import { ActivateCategoryUseCase, CreateCategoryInput, CreateCategoryUseCase, DeactivateCategoryUseCase, GetCategoryUseCase, ListCategoryUseCase, UpdateCategoryInput, UpdateCategoryUseCase } from '@core/node/category/application';
import { Body, Controller, Get, Inject, Param, Patch, Post, Put, Query } from '@nestjs/common';

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

    @Get()
    find(@Query() query: SearchQuery) {
        return this.listUseCase.execute(query);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() input: UpdateCategoryInput) {
        input.id = id;
        return this.updateUseCase.execute(input);
    }

    @Patch('/activate/:id')
    ativar(@Param('id') id: string) {
        return this.activateUseCase.execute(id);
    }

    @Patch('deactivate/:id')
    inativar(@Param('id') id: string) {
        return this.deactivateUseCase.execute(id);
    }
}
