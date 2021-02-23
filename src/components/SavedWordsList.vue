<template>
  <ul class="WordList" v-if="wordsList.length">
    <li
      v-for="word in wordsList"
      :key="word"
    >
      <p class="WordList__word">{{word}}</p>
      <button
        type="button"
        class="WordList__btn-delete"
        @click="deleteWord(word)"
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
    deleteWord(word) {
      this.$store.dispatch({
        type: 'deleteWord',
        word,
      });

      setWords(this.$store.state.wordsStore.savedWords);
    },
  },
  computed: {
    wordsList() {
      return this.$store.state.wordsStore.savedWordsList;
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
