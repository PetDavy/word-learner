<template>
  <div class="header">
    <FindWordForm class="header__find-word-form"></FindWordForm>
    <button
      type="button"
      class="header__btn"
      @click="showSavedWords"
    >
      My Words
    </button>
    <button
      type="button"
      class="header__btn"
      @click="playCardGame"
    >
      Card Game
    </button>
  </div>
</template>

<script>
import FindWordForm from './FindWordForm.vue';

export default {
  name: 'Header',
  components: {
    FindWordForm,
  },
  methods: {
    playCardGame() {
      this.$store.commit({
        type: 'changeMode',
        mode: 'inCardGameMode',
      });
    },
    showSavedWords() {
      this.$store.commit({
        type: 'changeMode',
        mode: 'inWordsShowMode',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 25px;

    background-color: green;

    &__find-word-form {
      width: 30%;
      height: 35px;
    }

    &__btn {
      padding: 5px 15px;
      border: none;
      background-color: blue;
      color: #fff;
      font-size: 18px;
      font-weight: 600;

      border-radius: 5px;
      cursor: pointer;
    }
  }
</style>
