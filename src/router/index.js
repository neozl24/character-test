import Vue from 'vue';
import Router from 'vue-router';

import Question from '@/components/question/Question.vue';
import Answer from '@/components/answer/Answer.vue';
import Cover from '@/components/cover/Cover.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Cover',
      component: Cover
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
