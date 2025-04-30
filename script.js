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
