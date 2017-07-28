import questions from '@/assets/data/questions.js';

var length = questions.length;

// 新建一个数组，用来表示所有问题的答题情况，每道题的情况用一个对象来表示。
// 对象的 type 属性同 question的 type属性一样
// 而 value 属性代表选择情况，0表示未答题，1表示第1个选项，2表示第2个选项，默认全部为 0
var answerList = [];
for (var i = 0; i < length; i++) {
  answerList.push({
    type: questions[i].type,
    value: 0
  });
}

const state = {
  answerList
};

export default state;
