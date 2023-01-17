<script>
import { useUsersStore } from '@/stores';
import CalendarLesson from './CalendarLesson.vue';

export default {
  name: 'CalendarWeek',
  components: {
    CalendarLesson,
  },
  setup() {
    const usersStore = useUsersStore();
    // const router = useRouter();

    // const getLessons = async () => {
    //     try {
    //         await usersStore.getLessons();
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    // onMounted(() => {
    //     if (!authStore.user) {
    //         router.push('/login');
    //     } else {
    //         getLessons();
    //     }
    // });

    return {
      usersStore
    };
  }
}


</script>

<template>
  <div>
    <h1>Calendar Week</h1>
    <CalendarLesson />
  </div>
</template>

<style lang="scss">

</style>