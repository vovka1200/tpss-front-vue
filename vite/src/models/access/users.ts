export class User {
    id: string
    created: string
    name: string
    username: string
    groups: string[]

    constructor() {
        this.id = '';
        this.created = '';
        this.name = '';
        this.username = '';
        this.groups = [];
    }
}