import Vue from 'vue';
import Router from 'vue-router';

import Question from '@/components/question/Question.vue';
import Answer from '@/components/answer/Answer.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/question/1'   // 默认跳转到第一题
    },
    {
      path: '/question/:id',
      name: 'Question',
      component: Question
    },
    {
      path: '/answer',
      name: 'Answer',
      component: Answer
    }
  ]
});
