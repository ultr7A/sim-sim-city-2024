import { Cell } from "./cell";

interface SpatialDevice<T> {
    read( x: number, z: number): T;
    write(x: number, z: number, value: any): void;
}

export class Viewport implements SpatialDevice<Cell> {
    public width:  number;
    public height: number;
    public globalWidth:  number;
    public globalHeight: number;
    public x: number;
    public z: number;
    public overscan: number[] = [8, 8]

    public data: Cell[][];

    constructor(width: number, height: number, globalWidth: number, globalHeight: number, 
                initializer: (size_x: number, size_z: number) => Cell[][], data?: Cell[][]
    ) {
        this.width  = width;
        this.height = height;
        this.globalWidth    = globalWidth;
        this.globalHeight   = globalHeight;

        this.x = 0;
        this.z = 0;

        if (data) {
            this.data = data;
        } else if (initializer) {
            this.data = initializer(this.globalWidth, this.globalHeight);
        } else {
            throw new Error('Viewport must be initialized with either data or an initializer function.');
        }
    }

    setPosition(x: number, z: number) {
        this.x = x;
        this.z = z;
    }

    move(x: number, z: number) {
        console.log(`Moving viewport by (${x}, ${z})`);
        this.x += x;
        this.z += z;
    }

    center() {
        this.x = Math.floor(this.globalWidth  / 2) - Math.floor(this.width  / 2);
        this.z = Math.floor(this.globalHeight / 2) - Math.floor(this.height / 2);
    }

    read(x: number, z: number): Cell {
        if (!this.data[z + this.z] || !this.data[z + this.z][x + this.x]) {
            return new Cell('void', 0, 0);
        }
        return this.data[z + this.z][x + this.x];
    }

    write(x: number, z: number, value: Cell) {
        this.data[z + this.z][x + this.x] = value;
    }
}