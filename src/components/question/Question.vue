<template lang="html">
  <div class="question-wrapper">
    <div class="control-bar">
      <div class="button back-button" v-show="displayBack" @click="back">上一题</div>
      <div class="button next-button" v-show="displayNext" @click="next">下一题</div>
    </div>
    <div class="question">{{question}}</div>
    <table class="option-wrapper">
      <tr>
        <td class="option" @click="chooseFirst">{{option1}}</td>
      </tr>
      <tr>
        <td class="option" @click="chooseSecond">{{option2}}</td>
      </tr>
    </table>
    <button class="submit" v-show="displayResultButton">查看结果</button>
  </div>
</template>

<script>
import questions from './questions.js';

export default {
  computed: {
    id() {
      return parseInt(this.$route.params.id, 10);
    },
    question() {
      return questions[this.id - 1].question;
    },
    option1() {
      return questions[this.id - 1].option1;
    },
    option2() {
      return questions[this.id - 1].option2;
    },
    totalNum() {
      return questions.length;
    },
    displayBack() {
      return this.id > 1;
    },
    displayNext() {
      return this.id < this.totalNum;
    },
    displayResultButton() {
      return this.id === this.totalNum;
    }
  },
  mounted() {
    // console.log(this.totalNum);
  },
  methods: {
    back() {
      if (this.displayBack) {
        this.$router.push({name: 'Question', params: {id: this.id - 1}});
      }
    },
    next() {
      if (this.displayNext) {
        this.$router.push({name: 'Question', params: {id: this.id + 1}});
      }
    },
    chooseFirst() {
      setTimeout(() => {
        this.next();
      }, 200);
    },
    chooseSecond() {
      setTimeout(() => {
        this.next();
      }, 200);
    }
  }
};
</script>

<style lang="less">
.question-wrapper {
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
  height: 100%;
  user-select: none;
  .control-bar {
    margin: 30px auto 30px;
    height: 30px;
    padding: 0 20px;
    .button {
      line-height: 30px;
      color: #666;
      cursor: pointer;
      &.back-button {
        float: left;
      }
      &.next-button {
        float: right;
      }
    }
  }
  .question {
    margin: 100px auto 50px;
    width: 70%;
    font-size: 18px;
    cursor: default;
    color: #111;
  }
  .option-wrapper {
    margin: 50px auto;
    width: 75%;
    tr {
      height: 80px;
      .option {
        padding: auto 20px;
        height: 60px;
        line-height: 30px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        color: #4e647f;
        &:hover {
          background-color: #e3e3e6;
        }
      }
    }
  }
  .submit {
    margin: 20px auto;
    width: 120px;
    height: 40px;
    border-radius: 30px;
    border: none;
    outline: none;
    background-color: #ff9c2d;
    color: #fff;
    &:hover {
      background-color: lighten(#ff9c2d, 10%);
    }
    &:active {
      background-color: lighten(#ff9c2d, 5%);
    }
  }
}
</style>
