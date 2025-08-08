const btn = document.getElementById('checkBtn');
const input = document.getElementById('hayrenInput');
const resultsDiv = document.getElementById('results');

const commonWords = new Set([
  'a', 'i', 'is', 'it', 'in', 'on', 'to', 'for', 'was', 'were', 'be', 'me', 'my', 'the', 'you', 'of', 'and', 'form', 'with', 'by', 'or', 'but', 'as', 'at', 'up', 'down', 'out', 'from', 'their'
]);

btn.addEventListener('click', async () => {
  resultsDiv.textContent = 'Checking...';
  const lines = input.value.trim().split('\n');

  if (lines.length !== 4) {
    resultsDiv.textContent = 'Error: Hayren should have exactly 4 lines.';
    return;
  }

  let output = '';
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const syllables = countSyllables(line);
    output += `Line ${i + 1}: ${syllables} syllables\n`;

    if (syllables !== 15) {
      output += ` → Should be 15 syllables.\n`;
    }

    const words = line.split(/\s+/);
    for (const word of words) {
      const clean = word.replace(/[^\w']/g, '').toLowerCase();
      if (!clean) continue;
      const valid = commonWords.has(clean) || await checkEnglishWord(clean);
      if (!valid) {
        output += `  • “${clean}” may be gibberish!\n`;
      }
    }
    output += '\n';
  }

  resultsDiv.textContent = output;
});

// Improved syllable counter
function countSyllables(line) {
  return line
    .toLowerCase()
    .split(/\s+/)
    .reduce((sum, w) => sum + countSyllablesInWord(w), 0);
}

function countSyllablesInWord(word) {
  word = word.toLowerCase().replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  let count = matches ? matches.length : 0;

  // Handle "bottle", "little", etc.
  if (word.endsWith("le") && word.length > 2 && !/[aeiouy]/.test(word[word.length - 3])) {
    count++;
  }
  if (count === 0) count = 1; // fallback for short words
  return count;
}

// Check against dictionary API
async function checkEnglishWord(word) {
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    return res.ok;
  } catch {
    return false;
  }
}
