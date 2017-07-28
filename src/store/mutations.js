const mutations = {
  'chooseOption'(state, payload) {
    state.answerList[payload.id - 1].value = payload.option;
  },
  'clearAnswers'(state) {
    state.answerList.forEach((answer) => {
      answer.value = 0;
    });
  }
};

export default mutations;
