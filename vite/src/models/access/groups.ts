import {Entity} from "@/models/entity";

export type Group = Entity & {
    members: string[]
}