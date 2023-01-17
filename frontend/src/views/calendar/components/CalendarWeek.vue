<script>
import {useUsersStore} from '@/stores';
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
    <div class="calendar">
      <div class="timeline">
        <div class="spacer"></div>
        <div class="time-marker">9:00</div>
        <div class="time-marker">10:00</div>
        <div class="time-marker">11:00</div>
        <div class="time-marker">12:00</div>
        <div class="time-marker">13:00</div>
        <div class="time-marker">14:00</div>
        <div class="time-marker">15:00</div>
        <div class="time-marker">16:00</div>
        <div class="time-marker">17:00</div>
        <div class="time-marker">18:00</div>
        <div class="time-marker">19:00</div>
        <div class="time-marker">20:00</div>
      </div>
      <div class="days">
        <div class="day mon">
          <div class="date">
            <p class="date-num">9</p>
            <p class="date-day">Poniedziałek</p>
          </div>
          <div class="events">
<!--            <div class="event start-15 end-21 securities">-->
<!--              <p class="title">Securities Regulation</p>-->
<!--              <p class="time">2 PM - 5 PM</p>-->
<!--            </div>-->
            <CalendarLesson/>
          </div>
        </div>
        <div class="day tues">
          <div class="date">
            <p class="date-num">12</p>
            <p class="date-day">Wtorek</p>
          </div>
          <div class="events">
            <div class="event start-10 end-12 corp-fi">
              <p class="title">Corporate Finance</p>
              <p class="time">10 AM - 12 PM</p>
            </div>
            <div class="event start-10 end-13 ent-law">
              <p class="title">Entertainment Law</p>
              <p class="time">1PM - 4PM</p>
            </div>
          </div>
        </div>
        <div class="day wed">
          <div class="date">
            <p class="date-num">11</p>
            <p class="date-day">Środa</p>
          </div>
          <div class="events">
            <div class="event start-12 end-15 writing">
              <p class="title">Writing Seminar</p>
              <p class="time">11 AM - 12 PM</p>
            </div>
            <div class="event start-10 end-12 securities">
              <p class="title">Securities Regulation</p>
              <p class="time">2 PM - 5 PM</p>
            </div>
          </div>
        </div>
        <div class="day thurs">
          <div class="date">
            <p class="date-num">12</p>
            <p class="date-day">Czwartek</p>
          </div>
          <div class="events">
            <div class="event start-10 end-13 corp-fi">
              <p class="title">Corporate Finance</p>
              <p class="time">10 AM - 12 PM</p>
            </div>
            <div class="event start-15 end-18 ent-law">
              <p class="title">Entertainment Law</p>
              <p class="time">1PM - 4PM</p>
            </div>
          </div>
        </div>
        <div class="day fri">
          <div class="date">
            <p class="date-num">13</p>
            <p class="date-day">Piątek</p>
          </div>
          <div class="events">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
:root {
  --numDays: 5;
  --numHours: 12;
  --timeHeight: 60px;
  --calBgColor: #fff1f8;
  --eventBorderColor: #f2d3d8;
  --eventColor1: #ffd6d1;
  --eventColor2: #fafaa3;
  --eventColor3: #e2f8ff;
  --eventColor4: #d1ffe6;
}

.calendar {
  display: grid;
  gap: 10px;
  grid-template-columns: auto 1fr;
  margin: 2rem;
}

.timeline {
  display: grid;
  grid-template-rows: repeat(var(--numHours), var(--timeHeight));
}

.days {
  display: grid;
  grid-column: 2;
  gap: 5px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}

.events {
  display: grid;
  grid-template-rows: repeat(var(--numHours), var(--timeHeight));
  border-radius: 5px;
  background: var(--calBgColor);
}

// Event

.title {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.space,
.date {
  height: 60px
}

// Global / Etc

body {
  font-family: system-ui, sans-serif;
}

.corp-fi {
  background: var(--eventColor1);
}

.ent-law {
  background: var(--eventColor2);
}

.writing {
  background: var(--eventColor3);
}

.securities {
  background: var(--eventColor4);
}

.date {
  display: flex;
  gap: 1em;
}

.date-num {
  font-size: 3rem;
  font-weight: 600;
  display: inline;
}

.date-day {
  display: inline;
  font-size: 3rem;
  font-weight: 100;
}
</style>