export type AccessMatrix = Rule[];

export interface Rule {
    object: String
    access: Method[]
}

export enum Method {
    read = 'read',
    write = 'write',
}