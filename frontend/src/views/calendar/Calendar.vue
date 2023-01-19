<script>

import {useUsersStore, useLessonStore} from '@/stores';
import CalendarForm from './components/CalendarForm.vue';
import CalendarWeek from './components/CalendarWeek.vue';

export default {
  name: 'Calendar',
  components: {
      CalendarForm,
      CalendarWeek
  },
  setup() {
      const usersStore = useUsersStore();
      const lessonStore = useLessonStore();

      return {
          usersStore,
          lessonStore
      };
  }
}

</script>

<template>
  <div class="p-4">
    <CalendarForm />
    <CalendarWeek />
  </div>
</template>
