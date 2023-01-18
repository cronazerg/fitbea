import {Layout, addLesson} from '@/views/lesson';

export default {
  path: '/addLesson',
  component: Layout,
  children: [
    {path: '', component: addLesson},
  ]
};
