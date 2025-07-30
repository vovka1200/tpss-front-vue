import {Entity} from "@/models/entity";

export class Group extends Entity {
    name: string
    members: string[]

    constructor() {
        super();
        this.name = '';
        this.members = [];
    }
}