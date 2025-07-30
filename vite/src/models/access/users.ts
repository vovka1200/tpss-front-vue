import {Entity} from "@/models/entity";

export class User extends Entity {
    name: string
    username: string
    groups: string[]

    constructor() {
        super();
        this.name = '';
        this.username = '';
        this.groups = [];
    }
}