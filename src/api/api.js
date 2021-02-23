const basUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en';

export async function getWord(word) {
  let result;

  try {
    const respons = await fetch(`${basUrl}/${word}`);

    if (respons.ok) {
      result = respons.json();
    } else {
      throw new Error();
    }
  } catch {
    return [{ word: 'Not Found', meanings: [] }]; // need to add error flag
  }

  return result;
}

export function getMeanings(words) {
  const wordsData = words.map((word) => getWord(word));
  const loadedWords = Promise.all(wordsData);

  return loadedWords.then((result) => result.map((item) => item[0]));
}

export function getSavedWords() {
  const words = localStorage.getItem('words');

  if (!words) {
    return [];
  }

  return words.split(',').reduce((wordsAccum, wordData) => {
    const [word, score] = wordData.split(':');

    return { ...wordsAccum, [word]: +score };
  }, {});
}

export function setWords(words) {
  const packedWords = Object.entries(words).map(([key, value]) => `${key}:${value}`);

  localStorage.setItem('words', packedWords);
}

export function getSynonyms() {
  return 'Synonyms';
}
