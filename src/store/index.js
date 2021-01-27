import { createStore } from 'vuex';

const baseModes = {
  inFindWordMode: false,
  inCardGameMode: false,
  inWordsShowMode: false,
};

const CARDS_AMOUNT = 1;

export default createStore({
  state: {
    modes: baseModes,
    activeWord: { word: 'No Word', meanings: [] },
    savedWords: [],
    shownCards: [],
    availableWords: [],
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
      state.availableWords = state.savedWords.filter((word) => (
        !state.currentCards.includes(word)
      ));

      if (state.currentCards.length < CARDS_AMOUNT && state.savedWords.length) {
        state.availableWords = [...state.availableWords, ...state.currentCards];

        state.currentCards = state.availableWords.sort(() => (
          Math.random() - 0.5
        )).splice(0, CARDS_AMOUNT);

        state.shownCards = state.currentCards;
      }
    },
  },
  getters: {
    wordsCount(state) {
      return state.currentCards.length || state.savedWords.length > state.shownCards.length;
    },
    currentCards(state) {
      return state.currentCards;
    },
    availableWords(state) {
      return state.availableWords.sort(() => Math.random() - 0.5);
    },
  },
  actions: {
  },
  modules: {
  },
});
