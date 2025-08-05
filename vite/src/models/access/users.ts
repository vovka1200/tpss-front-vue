import {Entity, Status} from "@/models/entity";

export type User = Entity & {
    username: string
    password: string
    groups: string[]

}

export type UserStatus = Status & {}