// random.js
function moveRandomVacuum() {
    const direction = Math.floor(Math.random() * 4);
    switch (direction) {
        case 0: if (yRandom > 0) yRandom--; break; // Up
        case 1: if (yRandom < gridSize - 1) yRandom++; break; // Down
        case 2: if (xRandom > 0) xRandom--; break; // Left
        case 3: if (xRandom < gridSize - 1) xRandom++; break; // Right
    }

    vacuumRandom.style.transform = `translate(${xRandom * cellSize}px, ${yRandom * cellSize}px)`;

    const index = yRandom * gridSize + xRandom;
    const cell = document.getElementById('grid-random').children[index];
    if (!cell.classList.contains('cleaned')) {
        cell.classList.add('cleaned');
        cleanedRandom++;
    }

    randomPercentElem.textContent = `${calculatePercent('grid-random', cleanedRandom)}%`;
}

// Inicializar o movimento randômico a cada 500ms
setInterval(moveRandomVacuum, 500);
