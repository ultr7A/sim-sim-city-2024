// Sim Sim City 2024 yo
// A game about a game about building a city
// - by Jaden Evans (ultr7a@gmail.com)


// import objects
import { game } from './game-state.ts';

// import functions
import { configureControls } from './input.ts';


// Initialize
document.addEventListener('DOMContentLoaded', () => {
    game.canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    game.ctx = game.canvas.getContext('2d') as CanvasRenderingContext2D;
    
    configureControls(game.canvas, game.nextTurn);
    game.drawGrid(game.ctx, game.canvas);

    game.updateStats();
});

