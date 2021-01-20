<template>
  <Header class="app__header"></Header>
  <main class="app__main">
    <ActiveWord v-if="inFindWord"></ActiveWord>
    <SavedWordsList v-else-if="inWordsShowMode"></SavedWordsList>
    <h2 v-else>
      Card Game
    </h2>
  </main>

</template>

<script>
import Header from './components/Header.vue';
import ActiveWord from './components/ActiveWord.vue';
import SavedWordsList from './components/SavedWordsList.vue';
import { getSavedWords } from './api/api';

export default {
  name: 'App',
  components: {
    Header,
    ActiveWord,
    SavedWordsList,
  },
  computed: {
    inFindWord() {
      return this.$store.state.modes.inFindWordMode;
    },
    inCardGame() {
      return this.$store.state.modes.inCardGameMode;
    },
    inWordsShowMode() {
      return this.$store.state.modes.inWordsShowMode;
    },
  },
  mounted() {
    this.$store.commit({
      type: 'loadSavedWords',
      words: getSavedWords(),
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
