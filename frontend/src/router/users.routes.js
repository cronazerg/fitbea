import {Layout, List, AddEdit} from '@/views/users';

export default {
  path: '/users',
  component: Layout,
  children: [
    {path: '', component: List},
    {path: 'addEdit', component: AddEdit}
  ]
};
