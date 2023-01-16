import {Layout, Calendar} from '@/views/calendar';

export default {
  path: '/calendar',
  component: Layout,
  children: [
    {path: '', component: Calendar}
  ]
};
