import { TaskModel } from "./Task";

export class ColumnModel {
    id: number;
    title: string;
    order: number;
    tasks: TaskModel[];

    constructor(id: number, title: string, tasks: TaskModel[], order: number) {
        this.id = id;
        this.title = title;
        this.tasks = tasks ?? [];
        this.order = order;
    }
}
