export const questionsToAnswer = state => state.answerList.filter((answer) => { return answer.value === 0; });

export const answeredAll = (state, getters) => getters.questionsToAnswer.length === 0;
