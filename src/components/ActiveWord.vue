<template>
  <div class="activeWord">
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
      @click="addWord"
      v-if="meanings.length"
    >
      add word
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
  },
  computed: {
    activeWord() {
      return this.$store.state.wordsStore.activeWord.word;
    },
    meanings() {
      return this.$store.state.wordsStore.activeWord.meanings;
    },
  },
};
</script>

<style lang="scss" scoped>
  .activeWord {
    padding: 10px 25px;

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
  }
</style>
