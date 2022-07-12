import { deepFreeze } from "../utils/object";

export abstract class ValueObject {
    protected _value: any;

    constructor(value: any) {
        this._value = deepFreeze(value);
    }

    get value(): any {
        return this._value;
    }

    toString = () => {
        if(typeof this.value !== "object" || this.value === null) {
            return this.value + "";
        }

        const valueStr = this.value.toString();
        return valueStr === "[object Object]"
            ? JSON.stringify(this.value)
            : valueStr;
    };
}

export default ValueObject;