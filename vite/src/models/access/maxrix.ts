export type AccessMatrix = Rule[];

export interface Rule {
    object: string
    access: Method[]
    description: string
}

export enum Method {
    read = 'read',
    write = 'write',
}