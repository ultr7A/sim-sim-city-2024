import { CellType } from "./cell-type";

export class Cell {
    constructor(
            public type: CellType, 
            public development: number, 
            public landValue: number,
            public crime: number = 0,
            public pollution: number = 0,
            public traffic: number = 0,
            public mystery: number = 0,
            public cute: number = 0
    ) {
        this.development = 0;
        this.landValue = 0;
        this.type = type;
    }
}