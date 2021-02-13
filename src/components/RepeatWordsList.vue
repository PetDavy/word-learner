<template>
  <ul class="WordList" v-if="wordsList.length">
    <li
      v-for="(word, index) in wordsList"
      :key="index"
    >
      <p class="WordList__word">{{word}}</p>
    </li>
  </ul>
  <h1 v-else>You don`t have words for repeat</h1>
</template>

<script>
export default {
  name: 'RepeatWprdsList',
  methods: {

  },
  computed: {
    wordsList() {
      return this.$store.state.gameStore.wordsForRepeat;
    },
  },
};

</script>

<style lang="scss" scoped>
  .WordList {
    & li {
      display: flex;
      justify-content: space-between;
      padding: 10px 40px;
      border-bottom: 1px solid #ccc;
      font-size: 18px;
    }

    &__word {
      &::first-letter {
        text-transform: uppercase;
      }
    }
  }
</style>
