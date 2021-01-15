import { createStore } from 'vuex';

const baseModes = {
  inFindWordMode: false,
  inCardGameMode: false,
};

export default createStore({
  state: {
    modes: baseModes,
    activeWord: { word: 'No Word', meanings: [] },
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
  },
  actions: {
  },
  modules: {
  },
});
