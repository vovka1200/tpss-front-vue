export type AccessMatrix = Rule[];

export interface Rule {
    object: String
    methods: Method[]
}

export enum Method {
    read = 'read',
    write = 'write',
}