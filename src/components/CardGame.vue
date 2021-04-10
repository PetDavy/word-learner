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
          v-for="data in exampleData"
          :key="data"
          :class="[
            'CardGame__example',
            {'CardGame__example--correct': correctAnswers.includes(data.word)},
            {'CardGame__example--wrong': wrongAnswers.includes(data.word)},
            ]"
          @click="makeChoice(data)"
        >
        {{data.displayText}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getMeanings, setWords } from '../api/api';

export default {
  name: 'CardGame',
  data() {
    return {
      exampleData: [],
      correctAnswers: [],
      wrongAnswers: [],
      isWrong: '',
    };
  },
  methods: {
    async getexampleData() {
      const meaningsData = await getMeanings([
        ...this.currentCards,
        ...this.availableWords.slice(0, this.currentCards.length * 3),
      ]);

      meaningsData.sort(() => Math.random() - 0.5); // update later

      this.exampleData = meaningsData.map((meaningItem) => ({
        ...meaningItem,
        displayText: this.setDisplayText(meaningItem),
      }));
    },
    setDisplayText(data) {
      const randomChoice = (max) => Math.floor(Math.random() * (max - 1));

      const meaning = data.meanings[randomChoice(data.meanings.length)];
      const definition = meaning.definitions[randomChoice(meaning.definitions.length)];

      return definition.definition;
    },
    makeChoice(selectedData) {
      const cardWord = this.currentCards[0];
      let cardWordScore = this.$store.state.wordsStore.savedWords[cardWord];

      if (selectedData.word === cardWord) {
        this.correctAnswers = [...this.correctAnswers, selectedData.word];

        cardWordScore += cardWordScore < 20 && cardWord !== this.isWrong ? 1 : 0;

        setTimeout(() => {
          this.$store.commit('clearCurrentCards');
          this.$store.dispatch('changeCurrentCards');
          this.getexampleData();
          this.correctAnswers = [];
          this.wrongAnswers = [];
        }, 1500);
      } else {
        this.wrongAnswers = [...this.wrongAnswers, selectedData.word];
        cardWordScore -= cardWordScore > 0 ? 1 : 0;
        this.isWrong = cardWord;

        this.$store.commit('addToForRepeat');
      }

      this.$store.state.wordsStore.savedWords[cardWord] = cardWordScore;
      setWords(this.$store.state.wordsStore.savedWords);
    },
  },
  mounted() {
    this.$store.dispatch('changeCurrentCards');
    this.getexampleData();
  },
  computed: {
    ...mapGetters([
      'wordsCount',
      'currentCards',
      'availableWords',
      'updatedWords',
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

    &__example {
      padding: 5px 10px;
      margin: 10px;
      background-color: rgb(207, 226, 235);
      cursor: pointer;

      &:hover {
        background-color: rgb(160, 211, 235);
      }

      &--correct {
        background-color: rgb(79, 209, 118);

        &:hover {
          background-color: rgb(65, 185, 101);
        }
      }
      &--wrong {
        background-color: rgb(230, 129, 112);

        &:hover {
          background-color: rgb(204, 101, 83);
        }
      }

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
