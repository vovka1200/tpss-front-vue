import {Param} from "@/models/params";

export type Entity = {
    id: string
    name: string
    created: string
    updated: string
    archived: boolean
    statusId: string
    status: string
    params: Param[]
}

export type Status = {
    id: string
    name: string
}
