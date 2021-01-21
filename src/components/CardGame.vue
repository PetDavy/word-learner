<template>
  <div class="CardGame">
    <div
      class="CardGame__cards cards"
      v-if="wordsCount"
    >
      <div
        class="cards__card"
        v-for="word in currentCards"
        :key="word"
      >
        {{word}}
      </div>

    </div>
    <h2 v-else>You dont have words to play</h2>
    <div class="CardGame__answers">
      Here are default answers
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CardGame',
  mounted() {
    this.$store.commit('changeCurrentCards');
  },
  computed: {
    ...mapGetters([
      'wordsCount',
      'currentCards',
    ]),
  },
};
</script>

<style lang="scss">
  .CardGame {
    display: flex;
    -moz-column-gap: 20px;
    column-gap: 20px;
    padding: 0 10px;

    &__cards,
    &__answers {
      width: calc(50% - 10px);
    }

    &__answers {
      background-color: #f4f4f4;
      padding: 15px 20px;
    }
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;

    &__card {
      height: 150px;
      display: flex;
      justify-content: center;
      padding: 5px 10px;
      border: 1px solid #666;
      background-color: #ccc;
    }
  }

</style>
