import InvalidUuidError from "../../error/invalid-uuid.error";
import Identifier from "../identifier";


function spyValidation() {
    return jest.spyOn(Identifier.prototype as any, 'validate')
}

describe("Identifier Tests", () => {

    const validateSpy = jest.spyOn(Identifier.prototype as any, 'validate');

    it('success identifier', () => {
        const id = Identifier.create();
        expect(id).toBeTruthy();
    });

    it('given uuid valid return success identifier', () => {        
        const expectedId = "9366b7dc-2d71-4799-b91c-c64adb205104";
        const id = Identifier.create(expectedId);
        expect(id).toBeTruthy();
        expect(id.value).toBe(expectedId);
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    it('given uuid null return success identifier', () => {        
        const expectedId: any = null;
        const id = Identifier.create(expectedId);
        expect(id).toBeTruthy();
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    it('should throw error when uuid is invalid', () => {        
        expect(() => Identifier.create("fake id")).toThrow(new InvalidUuidError());
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });

});