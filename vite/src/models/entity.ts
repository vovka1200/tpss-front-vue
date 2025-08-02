import {Param} from "@/models/params";

export abstract class Entity {
    id: string = ''
    name: string = ''
    created: string = ''
    updated: string = ''
    archived: boolean = false
    statusId: string = ''
    status: string = ''
    params: Param[] = []
}

export class Status {
    id: string = ''
    name: string = ''
}
