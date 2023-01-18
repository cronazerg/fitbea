<script>
import {useUsersStore, useLessonStore, useAuthStore} from '@/stores';

export default {
  name: 'CalendarLesson',

  props: {
    idlesson: {
      required: false
    },
  },

  setup() {
    const usersStore = useUsersStore();
    const lessonStore = useLessonStore();
    const authStore = useAuthStore();

    return {
      usersStore,
      lessonStore,
      authStore
    };
  },

  data () {
    return {
      lessonData: {},
      userid: null
    }
  },

  methods: {
    onSubmit() {
      this.lessonStore.singUpToLesson(this.idlesson, this.userid);
    },

    removeFrom() {
      this.lessonStore.singOffFromLesson(this.idlesson, this.userid);
    }
  },

  mounted() {
    this.lessonData = this.lessonStore.lessonsByDate.find(lesson => lesson.idlesson === this.idlesson);
    this.userid = this.authStore.userData.iduser;
  }
}

</script>

<template>
  <div :class="`event securities start-${lessonData.start_time} end-${lessonData.end_time}`">
    <p class="title">{{lessonData.title}}  SALA: {{lessonData.room_number}}</p>
    <p class="">{{lessonData.description}}</p>
    <p class="time">{{lessonData.start_time}}:00 - {{lessonData.end_time}}:00</p>
    <p class="">Wolne miejsca: {{lessonData.userCount}} / {{lessonData.size}}</p>
    <p class="">Trener: {{lessonData.name}} {{lessonData.last_name}}</p>
    <button v-if="!lessonData.alreadyOnLesson" @click=onSubmit() class="btn btn-primary">Zapisz się</button>
    <button v-if="lessonData.alreadyOnLesson" @click=removeFrom() class="btn btn-primary">Wypisz się</button>
  </div>
</template>

<style lang="scss">
.event {
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  border: 1px solid var(--eventBorderColor);
  border-radius: 5px;
  padding: 0.5rem;
  margin: 0 0.5rem;
  background: white;
  p {
    margin-bottom: 4px;
  }
}

.start-9 {
  grid-row-start: 1;
}

.start-10 {
  grid-row-start: 2;
}

.start-11 {
  grid-row-start: 3;
}

.start-12 {
  grid-row-start: 4;
}

.start-13 {
  grid-row-start: 5;
}

.start-14 {
  grid-row-start: 6;
}

.start-15 {
  grid-row-start: 7;
}

.start-16 {
  grid-row-start: 8;
}

.start-17 {
  grid-row-start: 9;
}

.start-18 {
  grid-row-start: 10;
}

.start-19 {
  grid-row-start: 11;
}

.end-10 {
  grid-row-end: 2;
}

.end-11 {
  grid-row-end: 3;
}

.end-12 {
  grid-row-end: 4;
}

.end-13 {
  grid-row-end: 5;
}

.end-14 {
  grid-row-end: 6;
}

.end-15 {
  grid-row-end: 7;
}

.end-16 {
  grid-row-end: 8;
}

.end-17 {
  grid-row-end: 9;
}

.end-18 {
  grid-row-end: 10;
}

.end-19 {
  grid-row-end: 11;
}

.end-20 {
  grid-row-end: 12;
}

.end-21 {
  grid-row-end: 13;
}
</style>