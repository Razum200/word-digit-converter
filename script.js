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

function convert() {
  const input = document.getElementById('input').value.trim();
  let result = /^[a-zA-Z]+$/.test(input)
    ? wordToDigits(input)
    : digitsToWord(input);

  document.getElementById('output').innerText = result;
}
