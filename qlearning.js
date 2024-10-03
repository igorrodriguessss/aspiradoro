// qlearning.js

// Função para escolher a melhor ação ou explorar
function chooseAction(state) {
    if (Math.random() < explorationRate) {
        return Math.floor(Math.random() * 4);  // Exploração aleatória
    } else {
        const qValues = qTable[`${state[0]}-${state[1]}`];
        if (qValues.every(q => q === 0)) {
            return Math.floor(Math.random() * 4);  // Exploração se todas as ações forem zero
        }
        return qValues.indexOf(Math.max(...qValues));  // Ação com maior Q-value
    }
}

// Função para atualizar a Q-Table com base na recompensa e no novo estado
function updateQTable(prevState, action, reward, newState) {
    const currentQ = qTable[`${prevState[0]}-${prevState[1]}`][action];
    const maxNextQ = Math.max(...qTable[`${newState[0]}-${newState[1]}`]);

    // Fórmula de atualização do Q-value
    qTable[`${prevState[0]}-${prevState[1]}`][action] = 
        currentQ + learningRate * (reward + discountFactor * maxNextQ - currentQ);
}

// Função para mover o aspirador usando Q-Learning
function moveIAVacuum() {
    const prevState = [xIA, yIA];
    const action = chooseAction(prevState);

    // Executar a ação escolhida
    switch (action) {
        case 0: if (yIA > 0) yIA--; break;  // Up
        case 1: if (yIA < gridSize - 1) yIA++; break;  // Down
        case 2: if (xIA > 0) xIA--; break;  // Left
        case 3: if (xIA < gridSize - 1) xIA++; break;  // Right
    }

    // Mover visualmente o aspirador
    vacuumIA.style.transform = `translate(${xIA * cellSize}px, ${yIA * cellSize}px)`;

    // Verificar se a célula foi limpa
    const index = yIA * gridSize + xIA;
    const cell = document.getElementById('grid-ia').children[index];
    const reward = cell.classList.contains('cleaned') ? -1 : 10;  // Penalidade se já foi limpa, recompensa se não

    // Marcar a célula como limpa se ainda não estiver
    if (!cell.classList.contains('cleaned')) {
        cell.classList.add('cleaned');
        cleanedIA++;
    }

    // Atualizar o percentual de limpeza
    iaPercentElem.textContent = `${calculatePercent('grid-ia', cleanedIA)}%`;

    // Atualizar a Q-Table
    updateQTable(prevState, action, reward, [xIA, yIA]);
}

// Inicializar o movimento com Q-Learning a cada 500ms
setInterval(moveIAVacuum, 500);
