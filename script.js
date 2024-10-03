// script.js

// Variáveis globais
const roomSize = 500;  // Tamanho das salas ajustado para 500px
const gridSize = 20;   // Grid de 20x20
const cellSize = roomSize / gridSize;

let xRandom = 0, yRandom = 0;
let xIA = 0, yIA = 0;
let xBrain = 0, yBrain = 0;

let cleanedRandom = 0, cleanedIA = 0, cleanedBrain = 0;

const randomPercentElem = document.getElementById('random-percent');
const iaPercentElem = document.getElementById('ia-percent');
const brainPercentElem = document.getElementById('brain-percent');

// Elementos dos aspiradores
const vacuumRandom = document.getElementById('vacuum-random');
const vacuumIA = document.getElementById('vacuum-ia');
const vacuumBrain = document.getElementById('vacuum-brain');

// Não precisamos da rede neural `net` aqui; ela será usada no `brainjs.js`
const qTable = {};
const learningRate = 0.1;
const discountFactor = 0.9;
const explorationRate = 0.3;

// Inicializa a Q-Table
function initializeQTable() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            qTable[`${i}-${j}`] = [0, 0, 0, 0]; // Q-values para as 4 direções
        }
    }
}

initializeQTable();

// Função para calcular o percentual de limpeza
function calculatePercent(gridId, totalCleaned) {
    return (totalCleaned / (gridSize * gridSize) * 100).toFixed(2);
}

// Função para criar o grid
function createGrid(id) {
    const grid = document.getElementById(id);
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        grid.appendChild(cell);
    }
}

createGrid('grid-random');
createGrid('grid-ia');
createGrid('grid-brain');
