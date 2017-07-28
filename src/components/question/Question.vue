<template lang="html">
  <div class="question-wrapper">
    <div class="control-bar">
      <div class="button back-button" v-show="displayBack" @click="back">上一题</div>
      <div class="button next-button" v-show="displayNext" @click="next">下一题</div>
    </div>
    <div class="question">{{question}}</div>
    <table class="option-wrapper">
      <tr>
        <td class="option" :class="{'current': currentOption === 1}" @click="chooseOption(1)">{{option1}}</td>
      </tr>
      <tr>
        <td class="option" :class="{'current': currentOption === 2}" @click="chooseOption(2)">{{option2}}</td>
      </tr>
    </table>
    <button class="submit" v-show="displayResultButton" @click="showResult">查看结果</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import questions from '@/assets/data/questions.js';

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
      return this.id < this.totalNum && this.currentOption > 0;
    },
    displayResultButton() {
      return this.$store.getters.answeredAll;
    },
    ...mapState({
      currentOption(state) {
        return state.answerList[this.id - 1].value;
      }
    })
  },
  mounted() {
    // 刷新页面，或者从结果页跳转过来时，会清空所有答案，然后返回到第一题
    this.$store.commit('clearAnswers');
    this.$router.push({name: 'Question', params: {id: 1}});
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
    chooseOption(index) {
      this.$store.commit('chooseOption', {
        id: this.id,
        option: index
      });
      setTimeout(() => {
        this.next();
      }, 100);
    },
    showResult() {
      this.$router.push({name: 'Answer'});
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
        &.current {
          background-color: #c3c3c8;
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
