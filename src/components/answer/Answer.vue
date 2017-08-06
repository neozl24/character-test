<template lang="html">
  <div class="answer-wrapper">
    <h3 class="title" v-show="displayResult">{{name}}</h3>
    <pre class="description" v-show="displayResult">{{description}}</pre>
    <div class="restart" @click="restart">重新开始</div>
  </div>
</template>

<script>
import answers from '@/assets/data/answers.js';

export default {
  computed: {
    displayResult() {
      return this.$store.getters.answeredAll;
    },
    answerList() {
      return this.$store.state.answerList;
    },
    type() {
      var typeString = '';

      ['EI', 'NS', 'FT', 'JP'].forEach(
        (groupType) => {
          typeString += this.decide(groupType);
        }
      );
      return typeString;
    },
    targetAnswer() {
      return answers.filter(
        answer => answer.type === this.type
      )[0];
    },
    name() {
      return this.targetAnswer.name;
    },
    description() {
      return this.targetAnswer.description;
    }
  },
  methods: {
    decide: function(groupType) {
      // 每个 answer的 value 为 1 或 2, 在相加的时候对应为 0 和 2
      // 将这些 0 和 2 全部相加，如果和小于对应 type类型的 answer的数量，则返回 groupType[0]
      // 如果和大于对应 type类型的 answer的数量，则返回 groupType[1]
      var count = 0;
      var correspondingAnswers = this.answerList.filter(
        answer => answer.type === groupType
      );
      correspondingAnswers.forEach(
        (answer) => {
          if (answer.value === 1) {
            count += 0;
          } else if (answer.value === 2) {
            count += 2;
          }
        }
      );
      if (count < correspondingAnswers.length) {
        return groupType[0];
      } else {
        return groupType[1];
      }
    },
    restart() {
      this.$store.commit('clearAnswers');
      this.$router.push({name: 'Cover'});
    }
  },
  mounted() {
    // console.log(answers);
    // console.log(this.$store.state.answerList);
    // console.log(this.type);
  }
};
</script>

<style lang="less">
.answer-wrapper {
  margin: 0 auto;
  padding: 0;
  width: 100%;
  height: 100%;
  max-width: 600px;
  background: url("/static/img/result-back.jpg") no-repeat fixed center;
  overflow: scroll;
  .title {
    margin: 100px auto 50px;
    font-size: 20px;
    color: #fff;
  }
  .description {
    margin: 50px auto;
    width: 80%;
    line-height: 25px;
    font-size: 14px;
    text-align: justify;
    white-space: pre-wrap;
    color: #fdfdfd;
  }
  .restart {
    margin: 80px auto;
    font-size: 16px;
    user-select: none;
    cursor: pointer;
    color: #fafafb;
    &:hover {
      color: #cacacb;
    }
    &:active {
      color: #dadadb;
    }
  }
}
</style>
