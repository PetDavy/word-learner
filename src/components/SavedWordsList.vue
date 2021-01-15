<template>
  <ul class="WordList" v-if="wordsList.length">
    <li
      v-for="word in wordsList"
      :key="word"
    >
      {{word}}
    </li>
  </ul>
  <h1 v-else>You don`t have words</h1>
</template>

<script>

export default {
  name: 'SavedWordsList',
  computed: {
    wordsList() {
      return this.$store.state.savedWords;
    },
  },
};

</script>

<style lang="scss" scoped>
  .WordList {
    & li {
      padding: 15px 0;
      border-bottom: 1px solid #ccc;
      font-size: 18px;

      &::first-letter {
        text-transform: uppercase;
      }
    }
  }
</style>
