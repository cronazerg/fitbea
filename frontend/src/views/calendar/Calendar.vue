<script>

import {useLessonStore, useAuthStore} from '@/stores';
import CalendarForm from './components/CalendarForm.vue';
import CalendarWeek from './components/CalendarWeek.vue';
import moment from 'moment';

export default {
  name: 'Calendar',
  components: {
      CalendarForm,
      CalendarWeek
  },
  setup() {
      const lessonStore = useLessonStore();
      const userStore = useAuthStore();

      return {
          lessonStore,
          userStore
      };
  },

  data() {
      return {}
  },


  beforeCreate() {
    this.lessonStore.getAllRooms();
    this.lessonStore.getLessons();
    this.lessonStore.getLessonByDate(`${moment().format("YYYY-MM-DD")}`, this.userStore.userData.iduser);
  },
}

</script>

<template>
  <div class="p-4">
    <CalendarForm />
    <CalendarWeek />
  </div>
</template>
