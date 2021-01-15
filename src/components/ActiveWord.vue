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
        <p>
          Definition:
          {{meaning.definitions[0].definition}}
        </p>
        <p>
          Example:
          {{meaning.definitions[0].example}}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ActiveWord',
  computed: {
    activeWord() {
      return this.$store.state.activeWord.word;
    },
    meanings() {
      return this.$store.state.activeWord.meanings;
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
  }
</style>
