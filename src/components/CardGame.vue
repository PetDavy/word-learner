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
      <ul>
        <li
          v-for="data in choiceData"
          :key="data"
          style="padding-bottom: 5px; border-bottom: 1px solid #000;"
        >
        {{data.meanings[0].definitions[0].definition}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getMeanings } from '../api/api';

export default {
  name: 'CardGame',
  data() {
    return {
      choiceData: [],
    };
  },
  methods: {
    async getChoiceData() {
      this.choiceData = await getMeanings([
        ...this.currentCards,
        ...this.availableWords.slice(0, this.currentCards.length * 3),
      ]);
    },
  },
  mounted() {
    this.$store.commit('changeCurrentCards');
    this.getChoiceData();
  },
  computed: {
    ...mapGetters([
      'wordsCount',
      'currentCards',
      'availableWords',
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
    justify-content: center;
    grid-template-columns: 350px;
    gap: 15px;

    &__card {
      height: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 10px;
      font-size: 28px;
      font-weight: 600;
      border: 1px solid #666;
      background-color: #ccc;
    }
  }

</style>
