import { CELL_SIZE, costs, SCREEN_SIZE } from "./const";
import { game } from "./game-state";


export const keyboard_state = {
    arrow_left: false,
    arrow_right: false,
    arrow_up: false,
    arrow_down: false,

    shift_left: false,
    shift_right: false,
};


function setTool(tool) {
    game.currentTool = tool;
}

function configureKeyboardShortcuts() {
    document.addEventListener('keydown', (event) =>{
        if (event.key === 'ArrowUp')    { game.map.move(0, -1); game.drawGrid(game.ctx, game.canvas); }
        if (event.key === 'ArrowDown')  { game.map.move(0,  1); game.drawGrid(game.ctx, game.canvas); }
        if (event.key === 'ArrowLeft')  { game.map.move(-1, 0); game.drawGrid(game.ctx, game.canvas); }
        if (event.key === 'ArrowRight') { game.map.move(1,  0); game.drawGrid(game.ctx, game.canvas); }

        if (event.key === 'w') { game.map.move(0, -1); game.drawGrid(game.ctx, game.canvas); }
        if (event.key === 's') { game.map.move(0,  1); game.drawGrid(game.ctx, game.canvas); }
        if (event.key === 'a') { game.map.move(-1, 0); game.drawGrid(game.ctx, game.canvas); }
        if (event.key === 'd') { game.map.move(1,  0); game.drawGrid(game.ctx, game.canvas); }

        if (event.key === ' ')          { game.map.center();    game.drawGrid(game.ctx, game.canvas); }
    });
}

function configureButton(id, action) {
    document.getElementById(id)?.addEventListener('click', action);
}

function initSpatialInput(canvas: HTMLCanvasElement) {
    canvas.addEventListener('click', (e) => {
        
        const rect = canvas.getBoundingClientRect();
        
        // Get click coordinates relative to canvas
        let screenX = ((e.clientX - rect.left) / rect.width) * canvas.width;
        let screenY = ((e.clientY - rect.top) / rect.height) * canvas.height;
        
        const cellX = Math.floor(screenX / CELL_SIZE);
        const cellY = Math.floor(screenY / CELL_SIZE);
        console.log({cellX, cellY});

        //if (cellX >= 0 && cellX < SCREEN_SIZE[0] && cellY >= 0 && cellY < SCREEN_SIZE[1]) {
            const cell = game.map.read(cellX, cellY);

            if (game.currentTool === 'bulldoze') {
                cell.type = 'dirt';
                cell.development = 0;

            } else if (game.currentTool in costs) {
                if (game.money >= costs[game.currentTool]) {
                    cell.type = game.currentTool;

                    game.money -= costs[game.currentTool];
                    game.updateStats();
                }
            }

            game.drawGrid(game.ctx, game.canvas);
        // }
    });
}

function configureKeyDownControls() {
    document.addEventListener('keydown', (event) => {
        
        if (event.key === 'ArrowLeft')  { keyboard_state.arrow_left = true; }
        if (event.key === 'ArrowRight') { keyboard_state.arrow_right = true; }
        if (event.key === 'ArrowUp')    { keyboard_state.arrow_up = true; }
        if (event.key === 'ArrowDown')  { keyboard_state.arrow_down = true; }
        if (event.key.toLowerCase() === 'w') { keyboard_state.arrow_up = true; }
        if (event.key.toLowerCase() === 'a') { keyboard_state.arrow_left = true; }
        if (event.key.toLowerCase() === 's') { keyboard_state.arrow_down = true; }
        if (event.key.toLowerCase() === 'd') { keyboard_state.arrow_right = true; }

        if (event.key === 'Shift')      { keyboard_state.shift_left = true; }
    })
}

function configureKeyUpControls() {
    document.addEventListener('keyup', (event) => {
        
        if (event.key === 'ArrowLeft')  { keyboard_state.arrow_left = false; }
        if (event.key === 'ArrowRight') { keyboard_state.arrow_right = false; }
        if (event.key === 'ArrowUp')    { keyboard_state.arrow_up = false; }
        if (event.key === 'ArrowDown')  { keyboard_state.arrow_down = false; }
        if (event.key.toLowerCase() === 'w') { keyboard_state.arrow_up = false; }
        if (event.key.toLowerCase() === 'a') { keyboard_state.arrow_left = false; }
        if (event.key.toLowerCase() === 's') { keyboard_state.arrow_down = false; }
        if (event.key.toLowerCase() === 'd') { keyboard_state.arrow_right = false; }

        
        if (event.key === 'Shift')      { keyboard_state.shift_left = false; }
    })
}


function configureScrollingControls() {
    document.addEventListener('wheel', (e) => {
        const delta = Math.floor(e.deltaY / 80);

        // check for either shift key
        if (keyboard_state.shift_left) {
            game.map.move(delta, 0);
        } else {
            game.map.move(0, delta);
            //game.angle += delta / 10.0;
        }

        game.drawGrid(game.ctx, game.canvas);
    });
}

export function configureControls(canvas: HTMLCanvasElement, nextTurn: Function) {
    configureButton('tree',        () => setTool('tree'));
    configureButton('grass',       () => setTool('grass'));
    configureButton('residential', () => setTool('residential'));
    configureButton('commercial',  () => setTool('commercial'));
    configureButton('industrial',  () => setTool('industrial'));
    configureButton('road',        () => setTool('road'));
    configureButton('power_line',  () => setTool('power_line'));
    configureButton('power_plant', () => setTool('power_plant'));
    
    configureButton('bulldoze',    () => setTool('bulldoze'));
    configureButton('nextTurn',    () => nextTurn());

    configureButton('reset', () => {
        localStorage.clear();
    });

    configureKeyDownControls();
    configureKeyUpControls();
    configureScrollingControls();

    configureKeyboardShortcuts();

    initSpatialInput(canvas)
}
