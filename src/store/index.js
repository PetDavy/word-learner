import { createStore } from 'vuex';

const baseModes = {
  inFindWordMode: false,
  inCardGameMode: false,
  inWordsShowMode: false,
};

export default createStore({
  state: {
    modes: baseModes,
    activeWord: { word: 'No Word', meanings: [] },
    savedWords: [],
    shownCards: [],
    currentCards: [],
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
    deleteWord(state, payload) {
      if (state.currentCards.includes(state.savedWords[payload.wordIndex])) {
        state.currentCards = [];
      }

      state.savedWords = state.savedWords.filter((word, index) => index !== payload.wordIndex);
    },
    changeCurrentCards(state) {
      if (!state.currentCards.length && state.savedWords.length) {
        state.currentCards = [...state.savedWords].sort(() => (
          Math.random() - 0.5
        )).splice(0, 4);
      }
    },
  },
  getters: {
    wordsCount(state) {
      return state.savedWords.length;
    },
    currentCards(state) {
      return state.currentCards;
    },
  },
  actions: {
  },
  modules: {
  },
});
