import {Entity} from "@/models/entity";

export class Param extends Entity {
    type: string = ''
}

export class ParamString extends Param {
    value: string = ''
    default: string = ''
}

export class ParamNumber extends Param {
    value: number = 0
    default: number = 0
}

export class ParamBoolean extends Param {
    value: boolean = false
    default: boolean = false
}

export class ParamSelect extends Param {
    value: {
        id: string
        value: string
    } = {id: '', value: ''}
    default: {
        id: string
        value: string
    } = {id: '', value: ''}
}