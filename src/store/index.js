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
      state.savedWords = state.savedWords.filter((word, index) => index !== payload.wordIndex);
    },
  },
  actions: {
  },
  modules: {
  },
});
