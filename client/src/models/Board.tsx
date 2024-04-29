import { ColumnModel } from "./Column";

export class BoardModel {
    id: number;
    title: string;
    columns: ColumnModel[];

    constructor(id: number, title: string, columns: ColumnModel[]) {
        this.id = id;
        this.title = title;
        this.columns = columns;
    }
}
