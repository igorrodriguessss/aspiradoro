// Definir a grade do mapa (SLAM) com estados desconhecidos, limpos e obstáculos
const gridMap = Array(gridSize).fill().map(() => Array(gridSize).fill('unknown')); // Todas as células começam como desconhecidas


// Definir a posição inicial do aspirador
let xSLAM = 0;
let ySLAM = 0;

// Função auxiliar para verificar o estado da célula no mapa (unknown, cleaned, obstacle)
function getCellState(x, y) {
    return gridMap[y][x];
}

// Função auxiliar para atualizar o estado da célula no mapa
function setCellState(x, y, state) {
    gridMap[y][x] = state;
}

// Simulação de sensores (células adjacentes)
function scanSurroundings(x, y) {
    const surroundings = {
        up: y > 0 ? getCellState(x, y - 1) : 'obstacle',
        down: y < gridSize - 1 ? getCellState(x, y + 1) : 'obstacle',
        left: x > 0 ? getCellState(x - 1, y) : 'obstacle',
        right: x < gridSize - 1 ? getCellState(x + 1, y) : 'obstacle'
    };
    return surroundings;
}

// Função para mover o aspirador com base no SLAM
function moveSLAMVacuum() {
    // Simular a leitura dos sensores ao redor do aspirador
    const surroundings = scanSurroundings(xSLAM, ySLAM);

    // Atualizar o mapa com o estado da célula atual como limpa
    setCellState(xSLAM, ySLAM, 'cleaned');

    // Decidir para onde mover com base no mapa e sensores
    if (surroundings.up === 'unknown') {
        ySLAM--;
    } else if (surroundings.down === 'unknown') {
        ySLAM++;
    } else if (surroundings.left === 'unknown') {
        xSLAM--;
    } else if (surroundings.right === 'unknown') {
        xSLAM++;
    } else {
        // Caso não haja mais células desconhecidas nas proximidades, fazer uma escolha aleatória entre células limpas
        const options = [];
        if (surroundings.up === 'cleaned') options.push('up');
        if (surroundings.down === 'cleaned') options.push('down');
        if (surroundings.left === 'cleaned') options.push('left');
        if (surroundings.right === 'cleaned') options.push('right');
        
        // Escolher aleatoriamente entre as opções limpas
        const randomDirection = options[Math.floor(Math.random() * options.length)];
        switch (randomDirection) {
            case 'up': ySLAM--; break;
            case 'down': ySLAM++; break;
            case 'left': xSLAM--; break;
            case 'right': xSLAM++; break;
        }
    }

    // Mover o aspirador visualmente
    vacuumBrain.style.transform = `translate(${xSLAM * cellSize}px, ${ySLAM * cellSize}px)`;

    // Atualizar a célula como limpa no mapa visual
    const newIndex = ySLAM * gridSize + xSLAM;
    const newCell = document.getElementById('grid-brain').children[newIndex];
    if (!newCell.classList.contains('cleaned')) {
        newCell.classList.add('cleaned');
        cleanedBrain++;
    }

    // Atualizar o percentual de limpeza
    brainPercentElem.textContent = `${calculatePercent('grid-brain', cleanedBrain)}%`;
}

// Inicializar o movimento SLAM a cada 500ms
setInterval(moveSLAMVacuum, 500);