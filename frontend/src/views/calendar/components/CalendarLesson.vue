<script>
import {useUsersStore} from '@/stores';

export default {
  name: 'CalendarLesson',
  setup() {
    const usersStore = useUsersStore();

    return {
      usersStore
    };
  }
}


</script>

<template>
  <div class="event start-15 end-21 securities">
    <p class="title">Securities Regulation</p>
    <p class="time">2 PM - 5 PM</p>
  </div>
</template>

<style lang="scss">
.event {
  border: 1px solid var(--eventBorderColor);
  border-radius: 5px;
  padding: 0.5rem;
  margin: 0 0.5rem;
  background: white;
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