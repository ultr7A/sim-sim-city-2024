// default: dirt

import { Cell } from "./cell";
import { circleSDF, pairwiseSmoothSDF, perlinSDF, SDF_Function } from "./sdf";

// grass
export function sdf_grass(x: number, z: number, size_x: number, size_z: number): number {
    
    return perlinSDF(x, z, size_x, size_z) 
}

export function sdf_tree(x: number, z: number, size_x: number, size_z: number): number {
    return perlinSDF(x, z, size_x / 2, size_z / 2);
}

export function game_map_earth(size_x: number, size_z: number): Cell[][] {
    const cells: Cell[][] = [];

    for (let z = 0; z < size_z; z++) {
        const row: Cell[] = [];
        
        for (let x = 0; x < size_x; x++) {
            const cell = new Cell('dirt', 0, 0);


            // grass
            if (sdf_grass(x, z, size_x, size_z) < 0.3) {
                cell.type = 'grass';
            }


            // tree
            if (sdf_tree(x, z, size_x, size_z) < -0.2) {
                cell.type = 'tree';
            }            

            row.push(cell);
        }
        cells.push(row);
    }
    return cells;
}