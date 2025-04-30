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

const items = [
  "EasterEgg", "JackInTheBox", "NekoHelmet", "TopHat", "LovePotion", "ToyBear",
  "DiamondRing", "LootBag", "LunarSnake", "TamaGadget", "CandyCane", "CookieHeart",
  "PartySparkler", "JingleBells", "GingerCookie", "WinterWreath", "SantaHat",
  "SnowGlobe", "SnowMittens", "SleighBell", "JesterHat", "StarNotepad", "BunnyMuffin",
  "SwissWatch", "SignetRing", "GenieLamp", "AstralShard", "PreciousPeach", "PlushPepe",
  "SpicedWine", "JellyBunny", "HangingStar", "DurovsCap", "LoveCandle", "PerfumeBottle",
  "MiniOscar", "EternalRose", "BerryBox", "VintageCigar", "RecordPlayer", "MagicPotion",
  "ElectricSkull", "KissedFrog", "HypnoLollipop", "HexPot", "EvilEye", "IonGem",
  "SharpTongue", "MadPumpkin", "TrappedHeart", "SkullFlower", "CrystalBall",
  "FlyingBroom", "VoodooDoll", "ScaredCat", "WitchHat", "EternalCandle", "SpyAgaric",
  "LolPop", "SakuraFlower", "HomemadeCake", "DeskCalendar", "BDayCandle"
];

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
  const isWord = /^[a-zA-Z]+$/.test(input);
  let result = isWord ? wordToDigits(input) : digitsToWord(input);

  document.getElementById('output').innerText = result;

  const linksDiv = document.getElementById('links');
  linksDiv.innerHTML = "";

  if (isWord) {
    const digitCode = result;
    items.forEach(item => {
      const link = document.createElement("a");
      link.href = `https://t.me/nft/${item}-${digitCode}`;
      link.target = "_blank";
      link.innerText = `${item}-${digitCode}`;
      linksDiv.appendChild(link);
    });
  }
}
