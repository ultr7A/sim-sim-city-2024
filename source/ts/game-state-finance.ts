import { MAP_SIZE } from "./const";
import { game } from "./game-state";

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
export function calculateFinances(openingBalance: number): number {
    let income = calculateTaxIncome();
    let expenses = calculateExpenses();

    game.stats.income = income;
    game.stats.expenses = expenses;

    return openingBalance + income - expenses;
}