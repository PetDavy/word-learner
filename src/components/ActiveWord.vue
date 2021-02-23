<template>
  <div :class="['activeWord', {'activeWord--saved': isSaved }]">
    <h1>
      {{activeWord}}
    </h1>
    <ul>
      <li
        v-for="(meaning, index) in meanings"
        :key="index"
      >
        <p class="activeWord__partOfSpeech">
          {{meaning.partOfSpeech}}
        </p>
        <div
          v-for="{definition, example} in meaning.definitions"
          :key="definition"
          class="activeWord__info"
        >
          <p v-if="definition">
            Definition:
            {{definition}}
          </p>
          <p v-if="example">
            Example:
            {{example}}
          </p>
        </div>
      </li>
    </ul>

    <button
      type="button"
      class="activeWord__btn"
      @click="addWord"
      v-if="meanings.length && !isSaved"
    >
      add word
    </button>

     <button
        type="button"
        class="activeWord__btn activeWord__btn--remove"
        @click="removeWord"
        v-if="isSaved"
      >
        remove word
      </button>
  </div>
</template>

<script>
import { setWords } from '../api/api';

export default {
  name: 'ActiveWord',
  methods: {
    addWord() {
      this.$store.commit({
        type: 'addWord',
        newWord: this.$store.state.wordsStore.activeWord.word,
      });

      setWords(this.$store.state.wordsStore.savedWords);
    },
    removeWord() {
      this.$store.dispatch({
        type: 'deleteWord',
        word: this.$store.state.wordsStore.activeWord.word,
      });

      setWords(this.$store.state.wordsStore.savedWords);
    },
  },
  computed: {
    activeWord() {
      return this.$store.state.wordsStore.activeWord.word;
    },
    meanings() {
      return this.$store.state.wordsStore.activeWord.meanings;
    },
    isSaved() {
      if (!this.meanings.length) {
        return false;
      }

      return this.$store.state.wordsStore.savedWords[this.activeWord] !== undefined;
    },
  },
};
</script>

<style lang="scss" scoped>
  .activeWord {
    position: relative;
    max-width: 1000px;
    margin-left: 20px;
    padding: 20px 30px;

    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    background-color: rgba(189, 179, 179, 0.2);

    &__partOfSpeech {
      padding: 10px 0;
      font-size: 15px;
      color: #666;
    }

    &__info {
      margin-bottom: 10px;
      padding: 5px 10px;
      border-bottom: 1px dashed #ccc;
    }

    &__btn {
      position: absolute;
      top: 25px;
      right: 30px;
      cursor: pointer;

      &--remove {
        background-color: rgb(230, 96, 96);
      }
    }

    &--saved {
      background-color: rgba(22, 190, 120, 0.2);
    }
  }
</style>
