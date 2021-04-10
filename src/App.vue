<template>
  <Header class="app__header" />
  <main class="app__main">
    <ActiveWord v-if="inFindWord" />
    <SavedWordsList v-else-if="inWordsShowMode" />
    <RepeatWordsList v-else-if="inRepeatWordsShowMode" />
    <CardGame v-else/>
  </main>

</template>

<script>
import Header from './components/Header.vue';
import ActiveWord from './components/ActiveWord.vue';
import SavedWordsList from './components/SavedWordsList.vue';
import RepeatWordsList from './components/RepeatWordsList.vue';
import CardGame from './components/CardGame.vue';
import { getSavedWords, getUpdated } from './api/api';

export default {
  name: 'App',
  components: {
    Header,
    ActiveWord,
    SavedWordsList,
    RepeatWordsList,
    CardGame,
  },
  computed: {
    inFindWord() {
      return this.$store.state.wordsStore.modes.inFindWordMode;
    },
    inCardGame() {
      return this.$store.state.wordsStore.modes.inCardGameMode;
    },
    inWordsShowMode() {
      return this.$store.state.wordsStore.modes.inWordsShowMode;
    },
    inRepeatWordsShowMode() {
      return this.$store.state.wordsStore.modes.inRepeatWordsShowMode;
    },
  },
  mounted() {
    this.$store.commit({
      type: 'loadSavedWords',
      words: getSavedWords(),
    });

    this.$store.commit({
      type: 'loadUpdatedWords',
      words: getUpdated(),
    });

    this.$store.commit({
      type: 'changeMode',
      mode: 'inFindWordMode',
    });
  },
};
</script>

<style lang="scss">
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-family: 'Segoe UI', sans-serif;
  }

  body,
  h1,
  h2,
  p,
  ul {
    margin: 0;
    padding: 0;
  }

  ul {
    list-style: none;
  }

  .app {
    &__header {
      height: 100px;
      margin-bottom: 20px;
    }
  }
</style>
