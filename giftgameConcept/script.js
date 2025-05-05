// Генерация сетки для игрока
function generateGrid(presents) {
    let grid = [];

    if (!presents || presents.length === 0) {
        return Array(81).fill({ type: "⬜", hp: 1, defense: 0 });
    }

    presents.forEach(name => {
        const stats = giftStats[name];
        if (!stats) return;

        for (let i = 0; i < stats.attack; i++) grid.push({ type: "🟥", hp: 10, defense: 1 });
        for (let i = 0; i < stats.defense; i++) grid.push({ type: "⬛", hp: 10, defense: 3 });
        for (let i = 0; i < stats.hp; i++) grid.push({ type: "⬜", hp: 10, defense: 0 });
    });

    while (grid.length < 81) {
        grid.push({ type: "⬜", hp: 1, defense: 0 });
    }

    return grid.slice(0, 81);
}

// Отображение сетки на экране
function renderGrid(grid, playerId) {
    const gridContainer = document.getElementById(playerId);
    gridContainer.innerHTML = "";

    // Добавим класс reverse для игрока B
    gridContainer.classList.toggle("reverse", playerId === "playerB");

    const displayGrid = playerId === "playerB" ? grid.slice().reverse() : grid;
    const linkBack = playerId === "playerB" ? (i => grid[grid.length - 1 - i]) : (i => grid[i]);

    displayGrid.forEach((pixel, index) => {
        const pixelDiv = document.createElement("div");
        pixelDiv.className = "pixel";
        pixelDiv.dataset.hp = pixel.hp;
        linkBack(index).domElement = pixelDiv;
        pixelDiv.innerHTML = `
            ${pixel.type}
            <div class="hp-bar" style="width: ${pixel.hp * 10}%"></div>
        `;
        gridContainer.appendChild(pixelDiv);

        // Привязываем DOM-элемент к пикселю для последующего доступа
        pixel.domElement = pixelDiv;
    });
}

// Функция для боя между пикселями
function fight(pixA, pixB) {
    const damage = {
        "🟥": 12,
        "⬛": 6,
        "⬜": 1
    };
    
    pixA.domElement?.classList.add("hit-flash");
    pixB.domElement?.classList.add("hit-flash");

    setTimeout(() => {
        pixA.domElement?.classList.remove("hit-flash");
        pixB.domElement?.classList.remove("hit-flash");
    }, 600);

    const dmgA = damage[pixA.type] || 0;
    const dmgB = damage[pixB.type] || 0;

    const effectiveDmgToA = Math.max(0, dmgB - (pixA.defense || 0));
    const effectiveDmgToB = Math.max(0, dmgA - (pixB.defense || 0));

    // Анимация полёта снарядов
    if (dmgA > 0 && pixA.domElement && pixB.domElement) {
        animateProjectile(pixA.domElement, pixB.domElement);
    }
    if (dmgB > 0 && pixB.domElement && pixA.domElement) {
        animateProjectile(pixB.domElement, pixA.domElement);
    }

    pixA.hp -= effectiveDmgToA;
    pixB.hp -= effectiveDmgToB;

    // Если HP <= 0, заменим символ на черепок
    if (pixA.domElement && pixA.hp <= 0) {
        pixA.domElement.innerHTML = `💀<div class="hp-bar" style="width: 0%"></div>`;
    }
    if (pixB.domElement && pixB.hp <= 0) {
        pixB.domElement.innerHTML = `💀<div class="hp-bar" style="width: 0%"></div>`;
    }

    // Обновление шкал HP
    if (pixA.domElement) {
        pixA.domElement.dataset.hp = pixA.hp;
        const bar = pixA.domElement.querySelector('.hp-bar');
        if (bar) bar.style.width = pixA.hp * 10 + '%';
    }

    if (pixB.domElement) {
        pixB.domElement.dataset.hp = pixB.hp;
        const bar = pixB.domElement.querySelector('.hp-bar');
        if (bar) bar.style.width = pixB.hp * 10 + '%';
    }

    const aAlive = pixA.hp > 0;
    const bAlive = pixB.hp > 0;

    let result;
    if (aAlive && !bAlive) result = "A побеждает";
    else if (!aAlive && bAlive) result = "B побеждает";
    else if (!aAlive && !bAlive) result = "Оба погибают";
    else result = "Оба выжили";

    return {
        result,
        updatedA: aAlive ? pixA : null,
        updatedB: bAlive ? pixB : null
    };
}


// Получение выбранных подарков игрока
function getSelectedGifts(playerId) {
    const container = document.getElementById(`${playerId}-selects`);
    return Array.from(container.querySelectorAll("select"))
        .map(sel => sel.value)
        .filter(value => value && giftStats[value]); // фильтруем пустые и невалидные
}

// Создание селекторов подарков для каждого игрока
function createGiftSelectors(playerId) {
    const container = document.getElementById(`${playerId}-selects`);
    container.innerHTML = ''; // очищаем

    for (let i = 0; i < 6; i++) {
        const select = document.createElement("select");

        Object.keys(giftStats).forEach(giftName => {
            const option = document.createElement("option");
            option.value = giftName;
            option.textContent = giftName;
            select.appendChild(option);
        });

        // Добавляем обработчик на изменение выбора
        select.addEventListener("change", function () {
            // Получаем выбранные подарки и обновляем статистику
            const newPresents = getSelectedGifts(playerId);
            updatePlayerStats(playerId, newPresents); // обновляем статистику
        });

        container.appendChild(select);
    }
}

// Сброс битвы
function resetBattle() {
    document.getElementById("battleLog").textContent = "";
    const playerAStats = document.getElementById("playerA-stats");
    const playerBStats = document.getElementById("playerB-stats");
    playerAStats.innerHTML = "";
    playerBStats.innerHTML = "";

    // сбрасываем выбранные подарки
    const selectsA = document.querySelectorAll("#playerA-selects select");
    const selectsB = document.querySelectorAll("#playerB-selects select");
    selectsA.forEach(select => select.value = giftNames[0]);
    selectsB.forEach(select => select.value = giftNames[0]);

    updatePlayerStats("playerA");
    updatePlayerStats("playerB");
}

function animateProjectile(fromEl, toEl) {
    return new Promise(resolve => {
      const rectFrom = fromEl.getBoundingClientRect();
      const rectTo = toEl.getBoundingClientRect();
  
      const projectile = document.createElement("div");
      projectile.className = "projectile";
      document.body.appendChild(projectile);
  
      projectile.style.left = rectFrom.left + "px";
      projectile.style.top = rectFrom.top + "px";
  
      const dx = rectTo.left - rectFrom.left;
      const dy = rectTo.top - rectFrom.top;
  
      projectile.style.setProperty('--transform', `translate(${dx}px, ${dy}px)`);
      projectile.style.animation = 'flyToTarget 0.6s ease forwards';
  
      projectile.addEventListener("animationend", () => {
        projectile.remove();
        resolve(); // завершаем промис
      });
    });
  }

// Показ проектира с улучшенной анимацией
function showProjectile(fromEl, toEl, symbol, callback) {
    if (!fromEl || !toEl) return;

    const projectile = document.createElement("div");
    projectile.classList.add("projectile");
    projectile.textContent = symbol;

    // Позиционируем снаряд с учётом начальной позиции первого игрока
    document.body.appendChild(projectile);

    // Получаем координаты для движения снаряда
    const startPos = fromEl.getBoundingClientRect();
    const endPos = toEl.getBoundingClientRect();

    const deltaX = endPos.left - startPos.left;
    const deltaY = endPos.top - startPos.top;

    // Устанавливаем начальную позицию снаряда
    projectile.style.position = "absolute";
    projectile.style.left = `${startPos.left + fromEl.offsetWidth / 2}px`;
    projectile.style.top = `${startPos.top + fromEl.offsetHeight / 2}px`;

    // Анимация снаряда с кривой Безье для плавности
    
    console.log("From:", startPos.left, startPos.top, "To:", endPos.left, endPos.top);

    projectile.animate(
        [
            { transform: "translate(0, 0)" }, 
            { transform: `translate(${deltaX * 1.5}px, ${deltaY * 1.5}px)` }
        ],
        {
            duration: 1000, // Увеличиваем время для плавности
            easing: "cubic-bezier(0.42, 0, 0.58, 1)" // Плавная кривая Безье
        }
    );

    // После завершения анимации удаляем снаряд
    setTimeout(() => {
        projectile.remove();
        callback();
    }, 1000); // Задержка, соответствующая времени анимации
}

// Шаг битвы
function runBattleStep() {
    if (gridA.length === 0 || gridB.length === 0) {
        const winner = gridA.length > 0 ? "🎉 Победа Игрока A" : 
                       gridB.length > 0 ? "🎉 Победа Игрока B" :
                       "🤝 Ничья!";
        updateLog(winner);
        return;
    }

    const pixA = gridA.shift();
    const pixB = gridB.shift();

    const { result, updatedA, updatedB } = fight(pixA, pixB);

    if (updatedA) gridA.push(updatedA);
    if (updatedB) gridB.push(updatedB);

    const aEl = pixA?.domElement;
    const bEl = pixB?.domElement;

    

    // Определяем, кто атакует
    const attacker = pixA && pixA.hp > 0 ? "A" : pixB && pixB.hp > 0 ? "B" : null;

    let fromEl, toEl, symbol;
    if (attacker === "A") {
        fromEl = aEl;
        toEl = bEl;
        symbol = pixA.type;
    } else if (attacker === "B") {
        fromEl = bEl;
        toEl = aEl;
        symbol = pixB.type;
    } else {
        updateLog(`Раунд ${round++}: A:${pixA.type} vs B:${pixB.type} → ${result}`);
        setTimeout(runBattleStep, 1000);
        return;
    }

    showProjectile(fromEl, toEl, symbol, () => {
        updateLog(`Раунд ${round++}: A:${pixA.type} vs B:${pixB.type} → ${result}`);

        // Перерисовываем только после окончания анимации
        renderGrid(gridA, "playerA");
        renderGrid(gridB, "playerB");

        setTimeout(runBattleStep, 1000);
    });
}

// Функция для расчета общей силы игрока
function calculateTotalStats(presents) {
    if (!Array.isArray(presents)) {
        return { attack: 0, defense: 0, hp: 0 };
    }

    let totalAttack = 0;
    let totalDefense = 0;
    let totalHP = 0;

    presents.forEach(name => {
        const stats = giftStats[name];
        if (stats) {
            totalAttack += stats.attack;
            totalDefense += stats.defense;
            totalHP += stats.hp;
        }
    });

    return {
        attack: totalAttack,
        defense: totalDefense,
        hp: totalHP
    };
}

// Функция для обновления визуальных элементов
function updatePlayerStats(playerId, presents) {
    const stats = calculateTotalStats(presents);

    // Проверяем, что элементы существуют перед обновлением
    const atkElement = document.getElementById(`${playerId}-atk`);
    const defenseElement = document.getElementById(`${playerId}-defense`);
    const hpElement = document.getElementById(`${playerId}-hp`);
    const atkBarElement = document.getElementById(`${playerId}-atk-bar`);
    const defenseBarElement = document.getElementById(`${playerId}-defense-bar`);
    const hpBarElement = document.getElementById(`${playerId}-hp-bar`);

    if (atkElement && defenseElement && hpElement && atkBarElement && defenseBarElement && hpBarElement) {
        // Обновляем числовые значения
        atkElement.innerText = `АТК: ${stats.attack}`;
        defenseElement.innerText = `ЗАЩ: ${stats.defense}`;
        hpElement.innerText = `HP: ${stats.hp}`;

        // Обновляем полоски
        atkBarElement.style.width = `${Math.min(stats.attack, 100)}%`;
        defenseBarElement.style.width = `${Math.min(stats.defense, 100)}%`;
        hpBarElement.style.width = `${Math.min(stats.hp, 100)}%`;
    }
}

// Функция для рендеринга интерфейса игрока
function renderPlayerInterface(playerId, presents) {
    const stats = calculateTotalStats(presents);
    return `
        <p id="${playerId}-atk">АТК: ${stats.attack}</p>
        <div id="${playerId}-atk-bar" class="stat-bar"></div>
        <p id="${playerId}-defense">ЗАЩ: ${stats.defense}</p>
        <div id="${playerId}-defense-bar" class="stat-bar"></div>
        <p id="${playerId}-hp">HP: ${stats.hp}</p>
        <div id="${playerId}-hp-bar" class="stat-bar"></div>
    `;
}

// Функция, которая будет вызываться при изменении подарков
function onGiftsChange(playerId, newPresents) {
    updatePlayerStats(playerId, newPresents);
}

// Логирование событий
const logLines = [];
function updateLog(newLine) {
    logLines.push(newLine);
    if (logLines.length > 3) logLines.shift(); // только 3 последних
    document.getElementById("battleLog").innerText = logLines.join("\n");
}

// Старт битвы
let gridA = [];
let gridB = [];
let round = 1;
function startBattle() {
    const playerAGifts = getSelectedGifts("playerA");
    const playerBGifts = getSelectedGifts("playerB");

    // Рендерим интерфейс статистики для игроков
    const playerAInterface = renderPlayerInterface("playerA", playerAGifts);
    const playerBInterface = renderPlayerInterface("playerB", playerBGifts);

    // Вставляем интерфейсы на страницу (например, в блок с id playerA-stats и playerB-stats)
    document.getElementById("playerA-stats").innerHTML = playerAInterface;
    document.getElementById("playerB-stats").innerHTML = playerBInterface;

    // Обновляем статистику игроков
    updatePlayerStats("playerA", playerAGifts);
    updatePlayerStats("playerB", playerBGifts);

    gridA = generateGrid(playerAGifts);
    gridB = generateGrid(playerBGifts);

    renderGrid(gridA, "playerA");
    renderGrid(gridB, "playerB");

    round = 1;
    document.getElementById("battleLog").textContent = '🏁 Битва началась!\n';
    runBattleStep(); // запускаем по раундам
}

function startFreeForAll() {
    const selectedGiftsA = getSelectedGifts("playerA");
    const selectedGiftsB = getSelectedGifts("playerB");

    const gridA = generateGrid(selectedGiftsA);
    const gridB = generateGrid(selectedGiftsB);

    renderGrid(gridA, "playerA");
    renderGrid(gridB, "playerB");

    const log = [];

    let indexA = 0;
    let indexB = 0;

    function isAlive(pixel) {
        return pixel.hp > 0;
    }

    function nextAlive(grid, index) {
        while (index < grid.length && !isAlive(grid[index])) {
            index++;
        }
        return index < grid.length ? index : -1;
    }

    function fightSimultaneous(a, b) {
        fight(a, b);
    }

    function battleStep() {
        indexA = nextAlive(gridA, indexA);
        indexB = nextAlive(gridB, indexB);

        if (indexA === -1 && indexB === -1) {
            log.push("⚔️ Бой завершён. Никто не выжил.");
            endBattle(log);
            return;
        }

        if (indexA === -1) {
            log.push("🎉 Победа Игрока B!");
            endBattle(log);
            return;
        }

        if (indexB === -1) {
            log.push("🎉 Победа Игрока A!");
            endBattle(log);
            return;
        }

        const pixA = gridA[indexA];
        const pixB = gridB[indexB];

        fightSimultaneous(pixA, pixB);
        log.push(`🔥 Пиксели A[${indexA}] и B[${indexB}] атаковали`);

        setTimeout(battleStep, 600); // пауза между ходами
    }

    battleStep();
}

function endBattle(logLines) {
    const logElement = document.getElementById("battleLog");
    logElement.textContent = logLines.join("\n");
}

function startFreeForAllBattle() {
    const presentsA = Array.from(document.querySelectorAll("#playerA-selects select")).map(s => s.value);
    const presentsB = Array.from(document.querySelectorAll("#playerB-selects select")).map(s => s.value);

    let gridA = generateGrid(presentsA);
    let gridB = generateGrid(presentsB);

    renderGrid(gridA, "playerA");
    renderGrid(gridB, "playerB");

    const log = document.getElementById("battleLog");
    log.innerText = "🔥 Режим: Все против всех\n";

    // Функция, которая находит живых пикселей
    const getAlive = grid => grid.filter(p => p.hp > 0);

    // Запуск с шагом
    let round = 1;
    function nextRound() {
        const aliveA = getAlive(gridA);
        const aliveB = getAlive(gridB);

        if (aliveA.length === 0 || aliveB.length === 0) {
            const winner = aliveA.length > 0 ? "Игрок A" : aliveB.length > 0 ? "Игрок B" : "Никто";
            log.innerText += `\n🏁 Победитель: ${winner}`;
            return;
        }

        log.innerText += `\n⚔ Раунд ${round++} — ${aliveA.length} vs ${aliveB.length}`;

        // Копируем массивы, чтобы не мешать итерации
        const attackersA = [...aliveA];
        const attackersB = [...aliveB];

        let i = 0;
        function step() {
            if (i >= Math.max(attackersA.length, attackersB.length)) {
                setTimeout(nextRound, 600);
                return;
            }

            const attackerA = attackersA[i % attackersA.length];
            const targetB = getAlive(gridB)[0];

            const attackerB = attackersB[i % attackersB.length];
            const targetA = getAlive(gridA)[0];

            if (attackerA && targetB) fight(attackerA, targetB);
            if (attackerB && targetA) fight(attackerB, targetA);

            i++;
            setTimeout(step, 150); // пауза между выстрелами
        }

        step();
    }

    nextRound();
}


// Инициализация
window.onload = () => {
    createGiftSelectors("playerA");
    createGiftSelectors("playerB");

    // Получаем текущие выбранные подарки
    const initialPresentsA = getSelectedGifts("playerA");
    const initialPresentsB = getSelectedGifts("playerB");

    // Обновляем статистику для игроков
    updatePlayerStats("playerA", initialPresentsA);
    updatePlayerStats("playerB", initialPresentsB);

    // Генерируем и отображаем сетку для игроков
    const gridA = generateGrid(initialPresentsA);
    const gridB = generateGrid(initialPresentsB);

    renderGrid(gridA, "playerA");
    renderGrid(gridB, "playerB");
};