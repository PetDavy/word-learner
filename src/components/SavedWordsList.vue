<template>
  <ul class="WordList" v-if="wordsList.length">
    <li
      v-for="(word, index) in wordsList"
      :key="index"
    >
      <p class="WordList__word">{{word}}</p>
      <button
        type="button"
        class="WordList__btn-delete"
        @click="deleteWord(index)"
      >
        delete
      </button>
    </li>
  </ul>
  <h1 v-else>You don`t have words</h1>
</template>

<script>
import { setWords } from '../api/api';

export default {
  name: 'SavedWordsList',
  methods: {
    deleteWord(index) {
      this.$store.commit({
        type: 'deleteWord',
        wordIndex: index,
      });

      setWords(this.$store.state.wordsStore.savedWords);
    },
  },
  computed: {
    wordsList() {
      return this.$store.state.wordsStore.savedWords;
    },
  },
};

</script>

<style lang="scss" scoped>
  .WordList {
    & li {
      display: flex;
      justify-content: space-between;
      padding: 15px 40px;
      border-bottom: 1px solid #ccc;
      font-size: 18px;
    }

    &__word {
      &::first-letter {
        text-transform: uppercase;
      }
    }

    &__btn-delete {
      padding: 10px 15px;
      background-color: #d04949;
      color: #fff;
      font-weight: 600;
      text-transform: uppercase;
      border: none;
      border-radius: 3px;
      cursor: pointer;
    }
  }
</style>
