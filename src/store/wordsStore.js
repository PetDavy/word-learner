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
    savedWords: [],
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
      state.savedWords = payload.words;
    },
    addWord(state, payload) {
      state.savedWords = [...state.savedWords, payload.newWord];
    },
  },
  actions: {
    deleteWord({ commit, state, rootState }, payload) {
      if (rootState.gameStore.currentCards.includes(state.savedWords[payload.wordIndex])) {
        commit('clearCurrentCards', null, { root: true });
      }

      state.savedWords = state.savedWords.filter((word, index) => index !== payload.wordIndex);
    },
  },
  getters: {
    wordsCount(state, getters) {
      return getters.currentCards.length || state.savedWords.length > getters.shownCards.length;
    },
  },
};
