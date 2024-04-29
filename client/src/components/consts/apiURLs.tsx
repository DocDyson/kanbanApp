export const ApiUrls = new class {
    readonly API_URL = 'http://127.0.0.1:8000/';

    // kanban
    board = this.API_URL + 'boards/';
    column = this.API_URL + 'columns/';
    task = this.API_URL + 'tasks/';
    users = this.API_URL + 'users/';
    comments = this.API_URL + 'comments/';

    // auth
    login = this.API_URL + 'dj-rest-auth/login/';
    register = this.API_URL + 'dj-rest-auth/registration/';
    changePassword = this.API_URL + 'dj-rest-auth/password/change/';

    // profile
    user = this.API_URL + 'dj-rest-auth/user/';

    constructor() {
        return this;
    }
}
