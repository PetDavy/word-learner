<template>
  <form
    action="#"
    class="find-word-form"
    @submit.prevent="findWord"
  >
    <input
      type="text"
      :class="[
        'find-word-form__input',
        {
          'find-word-form__input_error': hasError,
        }
      ]"
      v-model="inputValue"
      @focus="hasError = false"
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
      hasError: false,
    };
  },
  methods: {
    async findWord() {
      this.$store.commit({
        type: 'changeMode',
        mode: 'inFindWordMode',
      });

      if (!this.inputValue) {
        return;
      }

      const [word] = await getWord(this.inputValue);

      this.$store.commit({
        type: 'setActiveWord',
        word,
      });

      this.setHasError(word.meanings.length);
    },
    setHasError(meaningsLength) {
      if (!meaningsLength) {
        this.hasError = true;
      } else {
        this.hasError = false;
        this.inputValue = '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .find-word-form {
    display: flex;

    &__input {
      flex-grow: 1;
      outline: none;

      &_error {
        border: 2px solid red;
        color: red;
      }

    }

    &__btn {
      max-width: 100px;
      flex-shrink: 0;
    }
  }
</style>
