<template>
  <ul class="WordList" v-if="wordsList.length">
    <li
      v-for="word in wordsList"
      :key="word"
    >
      <p class="WordList__word">{{word}}</p>
      <div class="WordList__progress">
        <div
          class="WordList__progress-stick"
          v-for="stickNum in wordProgress(word)"
          :key="stickNum"
        ></div>
      </div>
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
    wordProgress(word) {
      return Math.ceil(this.$store.state.wordsStore.savedWords[word] / 5);
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
      flex-shrink: 0;
      min-width: 50%;

      &::first-letter {
        text-transform: uppercase;
      }
    }

    &__progress {
      display: flex;
      align-items: flex-end;
      min-width: 55px;
      gap: 5px;
    }

    &__progress-stick {
      width: 10px;
      background-color: #009933;

      &:nth-child(1) {
        height: 25%;
      }

      &:nth-child(2) {
        height: 50%;
      }

      &:nth-child(3) {
        height: 75%;
      }
      &:nth-child(4) {
        height: 100%;
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
