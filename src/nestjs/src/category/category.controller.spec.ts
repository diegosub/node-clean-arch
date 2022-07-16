import { CategoryOutput, CreateCategoryInput } from '@core/node/category/application';
import { Category, CategoryRepository } from '@core/node/category/domain';
import { CategoryTypeormRepository } from '@core/node/category/infrastructure';
import { Inject } from '@nestjs/common';
import { CategoryController } from './category.controller';

describe('CategoryController', () => {
    let controller: CategoryController;

    beforeEach(async () => {
        controller = new CategoryController();
    });

    it('should creates a category', async () => {
        const expectedOutput: CategoryOutput = {
            id: '9366b7dc-2d71-4799-b91c-c64adb205104',
            name: 'Movie',
            active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: new Date()
        };
        const mockCreateUseCase = {
            execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
        };
        //@ts-expect-error
        controller['createUseCase'] = mockCreateUseCase;
        const input: CreateCategoryInput = {
            name: 'Movie'
        };
        const output = await controller.create(input);
        expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
        expect(expectedOutput).toStrictEqual(output);
    });

});
