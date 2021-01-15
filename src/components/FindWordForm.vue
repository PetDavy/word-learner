<template>
  <form
    action="#"
    class="find-word-form"
    @submit.prevent="findWord"
  >
    <input
      type="text"
      class="find-word-form__input"
      v-model="inputValue"
    >
    <button
      type="submit"
      class="find-word-form__btn"
    >
      find word
    </button>
  </form>
</template>

<script>
import { getWord } from '../api/api';

export default {
  name: 'FindWordForm',
  data() {
    return {
      inputValue: '',
    };
  },
  methods: {
    async findWord() {
      this.$store.commit({
        type: 'changeMode',
        mode: 'inFindWordMode',
      });

      const [word] = await getWord(this.inputValue);

      this.$store.commit({
        type: 'setActiveWord',
        word,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .find-word-form {
    display: flex;

    &__input {
      flex-grow: 1;
    }

    &__btn {
      max-width: 100px;
      flex-shrink: 0;
    }
  }
</style>
