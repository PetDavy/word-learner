const CARDS_AMOUNT = 1;
const TOP_WORD_SCORE = 20;

export default {
  state: {
    shownCards: [],
    availableWords: [],
    currentCards: [],
    wordsForRepeat: [],
  },
  actions: {
    changeCurrentCards({ state, rootState }) {
      state.availableWords = rootState.wordsStore.savedWordsList.filter((word) => (
        !state.shownCards.includes(word)
      ));

      if (state.currentCards.length < CARDS_AMOUNT && rootState.wordsStore.savedWordsList.length) {
        const arrLength = state.availableWords.length;

        const copyWords = [...state.availableWords];
        state.availableWords = [];

        console.log(rootState.wordsStore.savedWords);

        for (let i = 0; i < arrLength; i += 1) {
          const randPosition = Math.floor(Math.random() * copyWords.length);
          const popWord = copyWords.splice(randPosition, 1);
          const popWordScore = rootState.wordsStore.savedWords[popWord];

          const shiftStep = (state.availableWords.length + 1) / TOP_WORD_SCORE;
          const shiftDist = shiftStep * popWordScore - ((TOP_WORD_SCORE / 2) * shiftStep);

          const newPos = Math.floor(Math.random() * state.availableWords.length + 1 + shiftDist);
          state.availableWords.splice(newPos, 0, popWord[0]);
        }

        console.log(state.availableWords);

        state.currentCards = state.availableWords.splice(0, CARDS_AMOUNT);

        state.shownCards = [...state.shownCards, ...state.currentCards];
      }
    },
  },
  mutations: {
    clearCurrentCards(state) {
      state.currentCards = [];
    },
    addToForRepeat(state) {
      if (state.wordsForRepeat.includes(state.currentCards[0])) {
        return;
      }

      state.wordsForRepeat = [...state.wordsForRepeat, state.currentCards[0]];
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
      return state.availableWords;
    },
  },
};
