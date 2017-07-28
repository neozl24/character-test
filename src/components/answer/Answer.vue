<template lang="html">
  <div class="answer">

  </div>
</template>

<script>
import answers from '@/assets/data/answers.js';

export default {
  mounted() {
    console.log(answers);
    console.log(this.$store.state.answerList);
  }
};
</script>

<style lang="less">
</style>
