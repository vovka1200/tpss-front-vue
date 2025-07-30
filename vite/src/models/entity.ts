import {Param} from "@/models/params";

export class Entity {
    id: string
    created: string
    updated: string
    archived: boolean
    params: Param[]

    constructor() {
        this.id = '';
        this.created = '';
        this.updated = '';
        this.archived = false;
        this.params = [];
    }

}