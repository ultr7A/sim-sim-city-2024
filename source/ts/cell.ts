import { CellType } from "./cell-type";

export class Cell {
    constructor(
            public type: CellType, 
            public development: number, 
            public landValue: number
    ) {
        this.development = 0;
        this.landValue = 0;
        this.type = type;
    }
}