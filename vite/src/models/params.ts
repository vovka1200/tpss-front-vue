export class Param {
    name: string
    type: string

    constructor() {
        this.name = '';
        this.type = '';
    }
}

export class ParamString extends Param {
    value: string
    default: string

    constructor() {
        super();
        this.default = '';
        this.value = this.default;
    }
}

export class ParamNumber extends Param {
    value: number
    default: number

    constructor() {
        super();
        this.default = 0;
        this.value = this.default;
    }
}

export class ParamBoolean extends Param {
    value: boolean
    default: boolean

    constructor() {
        super();
        this.default = false;
        this.value = this.default;
    }
}

export class ParamSelect extends Param {
    value: {
        id: string
        value: string
    }
    default: {
        id: string
        value: string
    }

    constructor() {
        super();
        this.default = {id: '', value: ''};
        this.value = this.default;
    }
}