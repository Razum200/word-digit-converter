
// В самом верху script.js, ещё до любых функциййййй
let logLines = [];
// сюда будем сохранять «исходные» статы для A и B
let initialStats = {
  playerA: null,
  playerB: null
};

// Очистить лог
function clearLog() {
  logLines = [];
  document.getElementById('battleLog').innerText = '';
}

// Добавить новую строку и отобразить
function updateLog(line) {
  logLines.push(line);
  if (logLines.length > 4) logLines.shift();       // храним последние 4 строки
  document.getElementById('battleLog').innerText = logLines.join('\n');
}

/**
 * Собирает из DOM для игрока массив объектов
 * [{ gls: 'BEAST', nft: 'Pepe', model: 'Golden', patt: 'Octo', bg: 'Black' }, …]
 */
function getAllPresents(playerId) {
  const container = document.getElementById(`${playerId}-selects`);
  return Array.from(container.children).map(slotDiv => {
    const [g, n, m, p, b] = slotDiv.querySelectorAll('select');
    return {
      gls:   g.value,
      nft:   n.value,
      model: m.value,
      patt:  p.value,
      bg:    b.value
    };
  });
}

// Генерация сетки для игрока 🧱🧱🧱
// Генерация сетки для игрока — берём весь массив объектов {gls,nft,model,patt,bg}
function generateGrid(presentsArr) {
  // если нет подарков — просто 81 «пустышка»
  if (!Array.isArray(presentsArr) || presentsArr.length === 0) {
    return Array(81).fill({ type: "⬜", hp: 1, defense: 0 });
  }

  // 1) объединяем все пять источников статов
  const stats = calculateTotalStats(presentsArr);  
  //    stats = { attack: X, defense: Y, hp: Z }

  // 2) строим массив пикселей
  const grid = [];
  for (let i = 0; i < stats.attack; i++)   grid.push({ type: "🟥", hp: 10, defense: 9 });
  for (let i = 0; i < stats.defense; i++)  grid.push({ type: "⬛", hp: 10, defense: 5 });
  for (let i = 0; i < stats.hp; i++) grid.push({ type: "⬜", hp: 10,  defense: 1 });

  // 3) дополняем до 81 «пустышкой» с hp=1
  while (grid.length < 81) {
    grid.push({ type: "▫️", hp: 1, defense: 0 });   // ← теперь hp:1
  }

  return grid;
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

        // 
    });
}

// Функция для боя между пикселями
function fight(pixA, pixB) {
    const damage = {
        "🟥": 10,
        "⬛": 6,
        "⬜": 2
    };

    // Визуальный эффект удара
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

    // Анимация полёта снарядов (только если живы и наносят урон)
    if (dmgA > 0 && pixA.hp > 0 && pixB.hp > 0 && pixA.domElement && pixB.domElement) {
        animateProjectile(pixA.domElement, pixB.domElement);
    }
    if (dmgB > 0 && pixA.hp > 0 && pixB.hp > 0 && pixB.domElement && pixA.domElement) {
        animateProjectile(pixB.domElement, pixA.domElement);
    }

    // Применение урона
    pixA.hp -= effectiveDmgToA;
    pixB.hp -= effectiveDmgToB;

    // Если кто-то умер — отрисовать череп
    if (pixA.domElement && pixA.hp <= 0) {
        pixA.hp = 0;
        pixA.domElement.innerHTML = `💀<div class="hp-bar" style="width: 0%"></div>`;
    }
    if (pixB.domElement && pixB.hp <= 0) {
        pixB.hp = 0;
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
        updatedB: bAlive ? pixB : null,
        hpA: pixA.hp,
        hpB: pixB.hp
    };
}


// Получение выбранных подарков ииигрокаааааа
function createGiftInputs(playerId) {
  const container = document.getElementById(`${playerId}-selects`);
  container.innerHTML = '';

  // утилитка для одного выпадашечного списка
  function makeSelect(statsLabel, statsObj) {
    const wrapper = document.createElement('div');
    wrapper.className = 'gift-attr';
  
    // создаём <select> без <label>
    const sel = document.createElement('select');
    sel.title = statsLabel;               // тултип с названием атрибута
    sel.setAttribute('aria-label', statsLabel); // для доступности
  
    // опции из statsObj
    Object.keys(statsObj).forEach(key => {
      const opt = document.createElement('option');
      opt.value       = key;
      opt.textContent = key;
      sel.appendChild(opt);
    });
  
    wrapper.appendChild(sel);
    return wrapper;
  }

  // теперь 6 «строк», каждая с номером и пятью селектами
  for (let i = 0; i < 6; i++) {
    const slotDiv = document.createElement('div');
    slotDiv.className = 'gift-slot';

    // Номер слота
    const num = document.createElement('span');
    num.className = 'slot-number';
    num.textContent = (i + 1) + '.';
    slotDiv.appendChild(num);

    // пять атрибутов
    slotDiv.append(
      makeSelect('GLS',     glsStats),
      makeSelect('NFT',     nftStats),
      makeSelect('МОДЕЛЬ',  modelStats),
      makeSelect('УЗОР',    patternStats),
      makeSelect('ФОН',     bgStats),
    );

    // навешиваем onchange на все селекты внутри строки
    slotDiv.querySelectorAll('select').forEach(sel => {
      sel.addEventListener('change', () => {
        // 1) собираем все слоты через утилиту
        const presents = getAllPresents(playerId);
    
        // 2) генерируем «пиксельную» сетку
        const grid = generateGrid(presents);
    
        // 3) пересчитываем текущие stats по самой сетке
        const currStats = {
          attack:  grid.filter(p => p.type === "🟥" && p.hp > 0).length,
          defense: grid.filter(p => p.type === "⬛" && p.hp > 0).length,
          hp:      grid.reduce((sum, p) => sum + p.hp, 0)
        };
    
        // 4) обновляем baseline, чтобы HP‑бар показывал 100% от текущего max
        initialStats[playerId] = { ...currStats };
    
        // 5) отрисовываем сетку и статус‑бары
        renderGrid(grid, playerId);
        updatePlayerStats(playerId, currStats, initialStats[playerId]);
      });
    });

    container.appendChild(slotDiv);
  }
}

/**
 * Заполняет все селекты в каждом слоте случайными значениями
 */
function randomizeGiftInputs(playerId) {
  const container = document.getElementById(`${playerId}-selects`);
  const statsList = [ glsStats, nftStats, modelStats, patternStats, bgStats ];
  container.querySelectorAll('.gift-slot').forEach(slotDiv => {
    const selects = slotDiv.querySelectorAll('select');
    selects.forEach((sel, idx) => {
      const keys = Object.keys(statsList[idx]);
      sel.value = keys[Math.floor(Math.random() * keys.length)];
    });
    
  });
}

// Она будет обновлять статистику игрока, например, атаку, защиту и здоровье в зависимости от выбранных подарков
function updatePlayerStats(playerId, current, initial) {
  const { attack, defense, hp } = current;

  // 1) ATK+DEF bar — их сумма всегда 100%
  const adTotal = (attack + defense) || 1;
  const atkPct = Math.round((attack  / adTotal) * 100);
  const defPct = Math.round((defense / adTotal) * 100);

  // 2) HP bar — от начального HP
  const hpPct = initial.hp > 0
    ? Math.round((hp / initial.hp) * 100)
    : 0;

  const statsEl = document.getElementById(`${playerId}-stats`);
  statsEl.innerHTML = `
  <div class="combined-bar">
    <div class="seg atk"   style="width: ${atkPct}%;"></div>
    <div class="seg def"   style="width: ${defPct}%;"></div>
  </div>
  <div class="hp-bar-extra">
    <div class="hp-fill"   style="width: ${hpPct}%;"></div>
  </div>
  <div class="stat-label">
    ATK: ${attack} | DEF: ${defense} | HP: ${hp}
  </div>
`;
  statsEl.style.display = 'block';
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



// Функция для расчета общей силы игрока
function calculateTotalStats(presentsArr) {
  const sums = { attack: 0, defense: 0, hp: 0 };
  presentsArr.forEach(p => {
    [
      glsStats[p.gls],
      nftStats[p.nft],
      modelStats[p.model],
      patternStats[p.patt],
      bgStats[p.bg]
    ].forEach(stats => {
      if (!stats) return;
      sums.attack  += stats.attack  || 0;
      sums.defense += stats.defense || 0;
      sums.hp      += stats.hp      || 0;   // ← здесь
    });
  });
  return sums;
}
  
function startFreeForAll() {
    // подчищаем старый лог и пишем шапку
    clearLog();
    updateLog('🔥 Berserk Mode начался');
  
    const allPresentsA = getAllPresents("playerA");
    const allPresentsB = getAllPresents("playerB");

    const gridA = generateGrid(allPresentsA);
    const gridB = generateGrid(allPresentsB);
  
    // 1) сохраняем исходные stats по пикселям
    const initialA = {
        attack:  gridA.filter(p => p.type === "🟥").length,
        defense: gridA.filter(p => p.type === "⬛").length,
        hp:      gridA.reduce((sum, p) => sum + p.hp, 0)    // суммируем реальное HP
      };
      const initialB = {
        attack:  gridB.filter(p => p.type === "🟥").length, // теперь gridB!
        defense: gridB.filter(p => p.type === "⬛").length,
        hp:      gridB.reduce((sum, p) => sum + p.hp, 0)
      };
  
    // отрисовываем сетки
    renderGrid(gridA, "playerA");
    renderGrid(gridB, "playerB");
  
    // 2) сразу рисуем полоски с начальными значениями
    updatePlayerStats("playerA", initialA, initialA);
    updatePlayerStats("playerB", initialB, initialB);
  
    // После всего — плавно скроллим к арене
    document.getElementById('arena').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    let indexA = 0, indexB = 0;

    
  
    function isAlive(pixel) {
      return pixel.hp > 0;
    }
  
    function nextAlive(grid, index) {
      while (index < grid.length && !isAlive(grid[index])) {
        index++;
      }
      return index < grid.length ? index : -1;
    }
  
    function battleStep() {
      indexA = nextAlive(gridA, indexA);
      indexB = nextAlive(gridB, indexB);
  
      if (indexA === -1 && indexB === -1) {
        updateLog("⚔️ Бой завершён. Никто не выжил.");
        return;
      }
      if (indexA === -1) {
        updateLog("🎉 Победа Игрока B!");
        return;
      }
      if (indexB === -1) {
        updateLog("🎉 Победа Игрока A!");
        return;
      }
  
      const pixA = gridA[indexA];
      const pixB = gridB[indexB];
  
      fight(pixA, pixB);
      updateLog(`🔥 Пиксели A[${indexA}] и B[${indexB}] атаковали`);
  
      // 3) пересчитаем текущие stats
      const currA = {
        attack:  gridA.filter(p => p.type === "🟥" && p.hp > 0).length,
        defense: gridA.filter(p => p.type === "⬛" && p.hp > 0).length,
        hp: gridA.reduce((sum, p) => sum + Math.max(p.hp, 0), 0)
      };
      const currB = {
        attack:  gridB.filter(p => p.type === "🟥" && p.hp > 0).length,
        defense: gridB.filter(p => p.type === "⬛" && p.hp > 0).length,
        hp: gridB.reduce((sum, p) => sum + Math.max(p.hp, 0), 0)
      };
  
      // обновляем полоски
      updatePlayerStats("playerA", currA, initialA);
      updatePlayerStats("playerB", currB, initialB);
  
      setTimeout(battleStep, 600); // пауза между ходами
    }
  
    battleStep();
  }

function endBattle(logLines) {
    const logElement = document.getElementById("battleLog");
    logElement.textContent = logLines.join("\n");
}

function startFreeForAllBattle() {
    clearLog();
    updateLog("🔥 Режим: Все против всех");
  
    const allA = getAllPresents("playerA");
    const allB = getAllPresents("playerB");
    let gridA = generateGrid(allA);
    let gridB = generateGrid(allB);
  
    // 1) записываем исходные stats по пикселям
    const initialA = {
        attack:  gridA.filter(p => p.type === "🟥").length,
        defense: gridA.filter(p => p.type === "⬛").length,
        hp:      gridA.reduce((sum, p) => sum + p.hp, 0)    // суммируем реальное HP
      };
      const initialB = {
        attack:  gridB.filter(p => p.type === "🟥").length, // теперь gridB!
        defense: gridB.filter(p => p.type === "⬛").length,
        hp:      gridB.reduce((sum, p) => sum + p.hp, 0)
      };
  
    renderGrid(gridA, "playerA");
    renderGrid(gridB, "playerB");
  
    // 2) сразу рисуем полоски
    updatePlayerStats("playerA", { ...initialA }, initialA);
    updatePlayerStats("playerB", { ...initialB }, initialB);
  
    // После всего — плавно скроллим к арене
    document.getElementById('arena').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    const getAlive = grid => grid.filter(p => p.hp > 0);
    let round = 1;
  
    function nextRound() {
      const aliveA = getAlive(gridA);
      const aliveB = getAlive(gridB);
  
      if (!aliveA.length || !aliveB.length) {
        const winner = aliveA.length ? "Игрок A" : aliveB.length ? "Игрок B" : "Никто";
        updateLog(`🏁 Победитель: ${winner}`);
        return;
      }
  
      updateLog(`⚔ Раунд ${round++} — ${aliveA.length} vs ${aliveB.length}`);
  
      const attackersA = [...aliveA];
      const attackersB = [...aliveB];
      let i = 0;
  
      function step() {
        if (i >= Math.max(attackersA.length, attackersB.length)) {
          // после завершения volleya — следующий раунд
          return setTimeout(nextRound, 600);
        }
  
        const attackerA = attackersA[i % attackersA.length];
        const targetB   = getAlive(gridB)[0];
        const attackerB = attackersB[i % attackersB.length];
        const targetA   = getAlive(gridA)[0];
  
        if (attackerA && targetB) fight(attackerA, targetB);
        if (attackerB && targetA) fight(attackerB, targetA);
  
        // ** Сразу после каждого выстрела пересчитываем и обновляем полоски **
        const currA = {
            attack:  gridA.filter(p => p.type==="🟥" && p.hp>0).length,
            defense: gridA.filter(p => p.type==="⬛" && p.hp>0).length,
            hp: gridA.reduce((sum,p)=> sum + Math.max(p.hp,0), 0)
          };
        const currB = {
            attack:  gridB.filter(p => p.type==="🟥" && p.hp>0).length,
            defense: gridB.filter(p => p.type==="⬛" && p.hp>0).length,
            hp: gridB.reduce((sum,p)=> sum + Math.max(p.hp,0), 0)
          };
        updatePlayerStats("playerA", currA, initialA);
        updatePlayerStats("playerB", currB, initialB);
  
        i++;
        setTimeout(step, 150);
      }
  
      step();
    }
  
    nextRound();
  }

function randomizeSelects(playerId) {
    const selects = document.querySelectorAll(`#${playerId}-selects select`);
    const giftNames = Object.keys(glsStats);
    selects.forEach(select => {
      const rnd = giftNames[Math.floor(Math.random() * giftNames.length)];
      select.value = rnd;
    });
  }



// Инициализация
window.onload = () => {
  ['playerA','playerB'].forEach(playerId => {
    // 1) создаём и рандомим селекты
    createGiftInputs(playerId);
    randomizeGiftInputs(playerId);

    // 2) собираем подарки и сразу строим грид
    const allPresents = getAllPresents(playerId);
    const grid        = generateGrid(allPresents);

    // 3) initialStats — именно из пикселей, а не из подарков
    const initial = {
      attack:  grid.filter(p => p.type === "🟥").length,
      defense: grid.filter(p => p.type === "⬛").length,
      hp:      grid.reduce((sum, p) => sum + p.hp, 0)   // 10×81 = 810
    };
    initialStats[playerId] = initial;

    // 4) сразу рисуем статус‑бары и грид
    updatePlayerStats(playerId, initial, initial);
    renderGrid(grid, playerId);
  });
};
