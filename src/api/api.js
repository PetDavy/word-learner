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
    return [{ word: 'Not Found', meanings: [] }];
  }

  return result;
}

export function getWords() {
  const words = localStorage.getItem('words');

  if (!words) {
    return [];
  }

  return words.split(',');
}

export function setWords(words) {
  localStorage.setItem('words', words);
}

export function getSynonyms() {
  return 'Synonyms';
}
