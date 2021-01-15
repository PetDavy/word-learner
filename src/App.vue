<template>
  <Header class="app__header"></Header>
  <main class="app__main">
    <ActiveWord v-if="inFindWord"></ActiveWord>
    <h2 v-else>
      Card Game
    </h2>
  </main>

</template>

<script>
import Header from './components/Header.vue';
import ActiveWord from './components/ActiveWord.vue';

export default {
  name: 'App',
  components: {
    Header,
    ActiveWord,
  },
  computed: {
    inFindWord() {
      return this.$store.state.modes.inFindWordMode;
    },
    inCardGame() {
      return this.$store.state.modes.inCardGameMode;
    },
  },
  mounted() {
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
  p {
    margin: 0;
    padding: 0;
  }

  .app {
    &__header {
      height: 100px;
      margin-bottom: 20px;
    }
  }
</style>
