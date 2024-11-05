import { colors } from "./const";
import { Viewport } from "./viewport";

export function graphics_minimap(viewport: Viewport, 
                                 ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    
    const CANVAS_SIZE = [canvas.width, canvas.height]
    const MINIMAP_SIZE = [Math.floor(CANVAS_SIZE[0] * 0.2), 
                          Math.floor(CANVAS_SIZE[1] * 0.2)];

    const THICKNESS = 5;
    const MINIMAP_POSITION = [CANVAS_SIZE[0] - MINIMAP_SIZE[0] - THICKNESS * 3, 
                                                                 THICKNESS * 3];
    

    // Viewport:
    const { width, height, globalWidth, globalHeight } = viewport;
                       
                   
    // calculate the fractional scale of the viewport, in minimap space:
    const scaleX = (width / globalWidth)   * MINIMAP_SIZE[0];
    const scaleY = (height / globalHeight) * MINIMAP_SIZE[1];

    // set cellScale to the ratio between the minimap size and the global size

    const cellScale =[MINIMAP_SIZE[0] / globalWidth, MINIMAP_SIZE[1] / globalHeight];


    // Cells:
    for (let y = 0; y < viewport.globalHeight; y++) {
        for (let x = 0; x < viewport.globalWidth; x++) {
            const cell = viewport.data[y][x];

            // render cell within minimap
            const cellColor = cell ? colors[cell.type] : colors.dirt;
            ctx.fillStyle = cellColor;
            ctx.fillRect(MINIMAP_POSITION[0] + cellScale[0] * x, 
                         MINIMAP_POSITION[1] + cellScale[1] * y, 
                         cellScale[0], cellScale[1]
            )
        }
    }


    // Draw the outline of the minimap
    ctx.lineWidth = THICKNESS;  // Adjust this to your desired thickness in pixels
    ctx.strokeStyle = 'white';

    ctx.strokeRect(MINIMAP_POSITION[0], MINIMAP_POSITION[1], 
                       MINIMAP_SIZE[0], MINIMAP_SIZE[1]);

 

    // calculate the position of the viewport, in minimap space:
    const VIEWPORT_POSITION = [MINIMAP_POSITION[0] + (viewport.x / globalWidth) * MINIMAP_SIZE[0],
                               MINIMAP_POSITION[1] + (viewport.z / globalHeight) * MINIMAP_SIZE[1]];

    // Draw the viewport rectangle
    ctx.strokeStyle = '#000000'
    ctx.strokeRect(VIEWPORT_POSITION[0]+THICKNESS / 2, VIEWPORT_POSITION[1] +THICKNESS / 2, 
                   scaleX, scaleY);

    ctx.strokeStyle = '#ffdf00';
    ctx.strokeRect(VIEWPORT_POSITION[0], VIEWPORT_POSITION[1], scaleX, scaleY);
}