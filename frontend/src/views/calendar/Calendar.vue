<script>

import {useUsersStore} from '@/stores';
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
  <div class="p-4">
    <h1>Zapisz się na zajęcia</h1>

    <CalendarForm />
    <CalendarWeek />
  </div>
</template>
