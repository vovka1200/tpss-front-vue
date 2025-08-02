import {Entity, Status} from "@/models/entity";

export class User extends Entity {
    username: string = ''
    password: string = ''
    groups: string[] = []

}

export class UserStatus extends Status {

}