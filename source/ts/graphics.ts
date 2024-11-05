// import consts
import { colors, emojis, vehicles, CELL_SIZE, SCREEN_SIZE } from './const.js';
import { game } from './game-state.js';
import { graphics_minimap } from './graphics-minimap.js';


function hasAdjacentDevelopedZone(x: number, y: number) {
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            
            const newX = x + dx;
            const newZ = y + dy;
            
            if (newZ >= 0 && newZ < SCREEN_SIZE[1] && newX >= 0 && newX < SCREEN_SIZE[0]) {
                const cell = game.map.read(newX, newZ) // grid[newZ][newX];
                
                if (cell && 
                    cell.type !== 'road' && 
                    cell.type !== 'power_line' && 
                    cell.development >= 50) {
                        console.log("developed cell: ", cell.type);
                    return true;
                }
            }
        }
    }
    return false;
}


export function drawGrid(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    //ctx.save();
    console.log("drawing grid...")
    ctx.fillStyle = colors.void;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
   
    
    // ctx.translate(canvas.width / 2, 0);
    // ctx.transform(1, 0.5, -1, 0.5, 0, 0);
      
   
    // // Move the origin to the center of the canvas
    // ctx.translate(canvas.width / 2, canvas.height / 2);

    // // Apply the rotation around the new origin
    // ctx.rotate(game.angle);

    // // Now translate back to the original position
    // ctx.translate(-canvas.width / 2, -canvas.height / 2);
   
    for (let y = -game.map.overscan[1]; y < SCREEN_SIZE[1]+game.map.overscan[1]; y++) {
        for (let x = -game.map.overscan[0]; x < SCREEN_SIZE[0]+game.map.overscan[0]; x++) {
            const cell = game.map.read(x, y);
            
            // Draw base cell
            ctx.fillStyle = cell ? colors[cell.type] : colors.dirt;
            ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE+1, CELL_SIZE+1);
            
            //Draw development indicator
            if (cell && cell.type !== 'road' && cell.type !== 'power_line') {
                ctx.fillStyle = `rgba(255, 255, 255, ${0.4 * (cell.development / 100)})`;
                ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
            
            // Draw building emoji for developed zones
            if (cell && emojis[cell.type] && cell.development >= 50) {
                ctx.font = '20px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = `rgba(255, 255, 255, 1)`;
                
                ctx.fillText(
                    emojis[cell.type][Math.floor(cell.development / 33 ) - 1],
                    x * CELL_SIZE + CELL_SIZE/2,
                    y * CELL_SIZE + CELL_SIZE/2
                );
            }
            
            // Draw vehicles on roads near developed zones
            if (cell.type === 'road' && hasAdjacentDevelopedZone(x, y) && Math.random() < 0.4) {
                const vehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
                ctx.font = '16px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(
                    vehicle,
                    x * CELL_SIZE + CELL_SIZE/2,
                    y * CELL_SIZE + CELL_SIZE/2
                );
            }
        }
    }
    //ctx.restore();
    graphics_minimap(game.map, ctx, canvas);
}