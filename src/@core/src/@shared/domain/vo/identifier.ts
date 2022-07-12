import { v4 as uuidv4, validate as uuidValidate } from 'uuid'; 
import InvalidUuidError from "../error/invalid-uuid.error";
import ValueObject from "./value-object";

export class Identifier extends ValueObject {

    private constructor(id: string) {
        super(id || uuidv4());
        this.validate();
    }

    private validate() {
        const isValid = uuidValidate(this._value); 
        if(!isValid) {
            throw new InvalidUuidError();
        }
    }

    static create(id?: string) {
        return new Identifier(id);
    }
}

export default Identifier;