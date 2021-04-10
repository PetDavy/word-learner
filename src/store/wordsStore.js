const baseModes = {
  inFindWordMode: false,
  inCardGameMode: false,
  inWordsShowMode: false,
  inRepeatWordsShowMode: false,
};

export default {
  state: {
    modes: baseModes,
    activeWord: { word: 'No Word', meanings: [] },
    savedWords: {}, // {'word': int: wordScore, ... }
    savedWordsList: [],
    updatedWords: [],
  },
  mutations: {
    changeMode(state, payload) {
      const { mode } = payload;

      state.modes = { ...baseModes };
      state.modes[mode] = true;
    },
    setActiveWord(state, payload) {
      state.activeWord = payload.word;
    },
    loadSavedWords(state, payload) {
      state.savedWords = { ...state.savedWords, ...payload.words };
      state.savedWordsList = Object.keys(state.savedWords);
    },
    addWord(state, payload) {
      state.savedWords = { ...state.savedWords, [payload.newWord]: 0 };
      state.savedWordsList = [...state.savedWordsList, payload.newWord];
    },
    loadUpdatedWords(state, payload) {
      state.updatedWords = [...payload.words];
    },
  },
  actions: {
    deleteWord({ commit, state, rootState }, payload) {
      const { word } = payload;

      if (rootState.gameStore.currentCards.includes(word)) {
        commit('clearCurrentCards', null, { root: true });
      }

      state.savedWordsList = state.savedWordsList.filter((listWord) => listWord !== word);
      delete state.savedWords[word];
    },
  },
  getters: {
    wordsCount(state, getters) {
      return getters.currentCards.length
      || Object.keys(state.savedWords).length > getters.shownCards.length;
    },
    updatedWords(state) {
      return state.updatedWords;
    },
  },
};
