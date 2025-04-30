// Подключение Telegram Web App API
const tg = window.Telegram.WebApp;
tg.expand(); // разворачивает окно на максимум

// Отображение имени пользователя (если доступно)
const userInfo = document.getElementById('user-info');
if (tg.initDataUnsafe.user) {
  const user = tg.initDataUnsafe.user;
  const name = user.username ? `@${user.username}` : user.first_name || 'пользователь';
  userInfo.innerText = `Привет, ${name}!`;
}

// Словарь преобразования
const letterToDigit = {
  'L': '1',
  'Z': '2',
  'E': '3',
  'A': '4',
  'S': '5',
  'G': '6',
  'T': '7',
  'B': '8',
  'J': '9',
  'O': '0'
};

const digitToLetter = Object.fromEntries(
  Object.entries(letterToDigit).map(([k, v]) => [v, k])
);

// Функции конвертации
function wordToDigits(word) {
  return word.toUpperCase().split('')
    .map(ch => letterToDigit[ch] || '?')
    .join('');
}

function digitsToWord(digits) {
  return digits.split('')
    .map(d => digitToLetter[d] || '?')
    .join('');
}

// Обработка ввода
function convert() {
  const input = document.getElementById('input').value.trim();
  const result = /^[a-zA-Zа-яА-Я]+$/.test(input)
    ? wordToDigits(input)
    : digitsToWord(input);

  document.getElementById('output').innerText = result;
}
