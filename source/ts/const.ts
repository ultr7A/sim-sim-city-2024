import { CellType } from "./cell-type";

// cells
export const SCREEN_SIZE = [20, 15];
export const MAP_SIZE = [SCREEN_SIZE[0] * 4, SCREEN_SIZE[1] * 4];
// pixels
export const CELL_SIZE = 40; 

export const costs: Record<CellType, number> = {
    // celestial
    star:  0,
    space: 0,
    void:  0,
    air:   0,
    cloud: 0,
    
    // terrestrial
    grass:  10,
    dirt:   0,
    water:  100,
    
    // objects
    tree:     50,
    rock:     25,
    mountain: 500,

    // civilization

    residential: 100,
    commercial:  150,
    industrial:  200,
    road:       50,
    power_line: 75,
    power_plant: 1000,
    
    // scenarios
    cosmic_horror: 1000000,
    comic_relief: 1000000,
    cuteness: 1000,
    existential_dread: 1000000,
};

export const colors: Record<CellType, string> = {
    // celestial
    void:   '#000000',
    space:  '#3000b5',
    star:   '#ffd900',
    air:    '#a5d5ff',
    cloud:  '#f2f2f2',
    
    // terrestrial
    grass:  '#bfff1e',
    dirt:   '#ffcf75',
    water:  '#2784ff',
    
    // objects
    tree:     '#43e000',
    rock:     '#808080',
    mountain: '#cdcdcd',
    
    // scenarios
    cuteness: '#ffd4e3',
    existential_dread: '#000000',
    cosmic_horror: '#760088',
    comic_relief:      '#ffe100',
    
    // civilization
    residential: '#ff4949',
    commercial:  '#001eff',
    industrial:  '#ffcc00',
    road:        '#808080',
    power_line:  '#ffee8e',
    power_plant: '#ffee8e',
};

export const emojis: Record<CellType, string[]> = {
    // celestial
    void:   [' '],
    space:  [' '],
    star:   ['🌟'],
    air:    [' '],
    cloud:  ['☁️'],

    // terrestrial
    grass:  ['🌿', '🌱', '🌿'],
    dirt:   [' ', ' ', '🌾'],
    water:  [' ', ' ', '🌊'],

    // objects
    tree:     ['🌲', '🌳', '🌴'],
    rock:     ['🪨', '🪨', '🪨'],
    mountain: ['⛰️', '🏔️', '🌋'],

    // civilization
    residential: ['🏡', '🏘️', '🏨'],
    commercial:  ['🏢', '🏢', '🏢'],
    industrial:  ['🏭', '🏭', '🏭'],
    road:        [' '],
    power_line:  [' '],
    power_plant: ['☢️'],

    // scenarios
    cuteness: ['🐇', '🐁', '🐿️'],
    existential_dread: ['🕳️', '☠️', '😯'],
    cosmic_horror: ['👾', '👽', '🛸'],
    comic_relief: ['🎭', '🌭', '🦮']
};

export const vehicles = ['🚗', '🚙', '🚐', '🚛', '🚕'];
