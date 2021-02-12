import { createStore } from 'vuex';
import gameStore from './gameStore';
import wordsStore from './wordsStore';

export default createStore({
  modules: {
    wordsStore,
    gameStore,
  },
});
