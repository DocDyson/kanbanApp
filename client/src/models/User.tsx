export class UserModel {
    id?: number;
    email?: string;
    name?: string;
    surname?: string;
    description?: string;
    key?: string;
    avatar?: string;

    constructor(id?: number, name?: string, surname?: string, email?: string, description?: string, key?: string, avatar?: string) {
        this.id = id;
        this.name = name ?? '';
        this.surname = surname ?? '';
        this.email = email ?? '';
        this.description = description ?? '';
        this.key = key ?? '';
        this.avatar = avatar ?? '';
    }
}
