const CARDS_AMOUNT = 1;

export default {
  state: {
    shownCards: [],
    availableWords: [],
    currentCards: [],
  },
  actions: {
    changeCurrentCards({ state, rootState }) {
      state.availableWords = rootState.wordsStore.savedWords.filter((word) => (
        !state.shownCards.includes(word)
      ));

      if (state.currentCards.length < CARDS_AMOUNT && rootState.wordsStore.savedWords.length) {
        state.currentCards = state.availableWords.sort(() => (
          Math.random() - 0.5
        )).splice(0, CARDS_AMOUNT);

        state.shownCards = [...state.shownCards, ...state.currentCards];
      }
    },
  },
  mutations: {
    clearCurrentCards(state) {
      state.currentCards = [];
    },
  },
  getters: {
    currentCards(state) {
      return state.currentCards;
    },
    shownCards(state) {
      return state.shownCards;
    },
    availableWords(state) {
      return state.availableWords.sort(() => Math.random() - 0.5);
    },
  },
};
