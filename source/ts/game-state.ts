import { MAP_SIZE, SCREEN_SIZE } from "./const";
import { Viewport } from "./viewport";
import { drawGrid } from "./graphics";
import { game_map_earth } from "./nature";
import { CellType } from "./cell-type";

const viewport = new Viewport(SCREEN_SIZE[0],     SCREEN_SIZE[1], 
                              SCREEN_SIZE[0] * 4, SCREEN_SIZE[1] * 4, game_map_earth);

viewport.center();

export class game {
    
    // graphics resources:
    static canvas: HTMLCanvasElement;
    static ctx: CanvasRenderingContext2D;
    
    // scalar state:
    static timeStep: any;        // timeout id
    static turn: number = 0;
    
    // game state:
    static money: number = 8000;
    static population: number = 0;
    static stats = {
        income: 0,
        expenses: 0,
    };

    // player state:
    static currentTool: CellType | "bulldoze" = 'dirt';
    
    // game map state:
    static map = viewport;
 
    // updates
    static update = updateGame;
    static updateStats = updateStats;
    static nextTurn = nextTurn;
    
    // graphics
    static drawGrid = drawGrid;

    // debug
    static angle = 0;

}

function updateStats() {
    (document.getElementById('money') as any).textContent = game.money;
    (document.getElementById('expenses') as any).textContent = game.stats.expenses;
    (document.getElementById('income') as any).textContent = game.stats.income;
    (document.getElementById('population') as any).textContent = game.population;
}

function calculateTaxIncome(): number {
    let income = 0;

    for (let y = 0; y < MAP_SIZE[1]; y++) {
        for (let x = 0; x < MAP_SIZE[0]; x++) {
            const cell = game.map.data[y][x];

            if (cell && cell.type !== 'road' && cell.type !== 'power_line') {
                if      (cell.type === 'residential') { income += 10 * (cell.development / 10); }
                else if (cell.type === 'commercial')  { income += 15 * (cell.development / 10); }
                else if (cell.type === 'industrial')  { income += 20 * (cell.development / 10); }
            }
        }
    }

    
    return Math.floor(income);
}

function calculateExpenses(): number {
    let expenses = 0;

    for (let y = 0; y < MAP_SIZE[1]; y++) {
        for (let x = 0; x < MAP_SIZE[0]; x++) {
            const cell = game.map.data[y][x];
            
            if (cell.type === 'road') {
                expenses += 5; // Example cost for road maintenance
            } else if (cell.type === 'power_line') {
                expenses += 10; // Example cost for power line maintenance
            }
        }
    }

    return expenses;
}

/**
 * 
 * updates game stats
 * @returns available funds
 */
function calculateFinances(openingBalance: number): number {
    let income = calculateTaxIncome();
    let expenses = calculateExpenses();

    game.stats.income = income;
    game.stats.expenses = expenses;

    return openingBalance + income - expenses;
}

function updateLandValues() {
    for (let y = 0; y < MAP_SIZE[1]; y++) {
        for (let x = 0; x < MAP_SIZE[0]; x++) {
            const cell = game.map.data[y][x];
            
            let value = 1;
            let hasRoad = false;

            // Check for nearby roads and power lines using Cartesian distance
            for (let dy = -2; dy <= 2; dy++) {
                for (let dx = -2; dx <= 2; dx++) {
                    if (y + dy >= 0 && y + dy < MAP_SIZE[1] && x + dx >= 0 && x + dx < MAP_SIZE[0]) {
                        const other = game.map.data[y + dy][x + dx];
                        
                        if (!other) continue;
                        
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (other.type === 'power_line') {
                            value += 1.5 / distance;
                        } else if (other.type === 'road') {
                            hasRoad = true;
                            value += 4.6 / distance;
                        } else if (other.type === 'water') {
                            value += 3.0 / distance;
                        } else if (other.type === 'tree') {
                            value += 5.4 / distance;
                        } else if (other.type === 'grass') {
                            value += 4.2 / distance;
                        }
                    }
                }
            }

            if (!hasRoad) {
                value -= 5;
            }

            // Update land value based on new attributes
            value += cell.crime * -1;
            value += cell.pollution * -2;
            value += cell.traffic * -3;
            value += cell.mystery * 0.5;
            value += cell.cute * 2;

            cell.landValue = value;
        }
    }
}

function updateDevelopment() {
    for (let y = 0; y < MAP_SIZE[1]; y++) {
        for (let x = 0; x < MAP_SIZE[0]; x++) {
            const cell = game.map.data[y][x];
            
            if (cell && cell.type !== 'road' && cell.type !== 'power_line') {
                let hasPower = false;
                let hasRoad = false;
                
                for (let dy = -2; dy <= 2; dy++) {
                    for (let dx = -2; dx <= 2; dx++) {
                        if (y + dy >= 0 && y + dy < MAP_SIZE[1] && x + dx >= 0 && x + dx < MAP_SIZE[0]) {
                            const neighbor = game.map.data[y + dy][x + dx];
                            
                            if (neighbor.type === 'power_line') hasPower = true;
                            if (neighbor.type === 'road') hasRoad = true;

                        }
                    }
                }

                if (hasPower && hasRoad) {
                    

                    cell.development = Math.min(cell.development + 5, cell.landValue)
                    cell.development  = Math.min(cell.development, 100);
                }
            }
        }
    }
}


function updateGame() {
    game.turn += 1;

    updateLandValues();
    updateDevelopment();
    game.money = calculateFinances(game.money);
    game.updateStats();

    game.population = 0;

    for (let z = 0; z < MAP_SIZE[1]; z++) {
        for (let x = 0; x < MAP_SIZE[0]; x++) {
            const cell = game.map.data[z][x];

            if (cell.type === 'residential') {
                game.population += Math.floor(10 * cell.landValue * (cell.development / 100));
            }
        }
    }
}

function nextTurn() {
    updateGame();
    
    // Update Text UI
    updateStats();
    (document.getElementById('turn') as any).textContent = `Turn: ${game.turn}`;
    
    // Update Spatial UI
    game.drawGrid(game.ctx, game.canvas);
    
    // schedule next turn
    clearTimeout(game.timeStep);
    game.timeStep = setTimeout(() => nextTurn(), 2000);
}