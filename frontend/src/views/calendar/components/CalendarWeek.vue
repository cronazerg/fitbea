<script>
import {useLessonStore, useUsersStore} from '@/stores';
import CalendarLesson from './CalendarLesson.vue';
import moment from 'moment';

export default {
  name: 'CalendarWeek',
  components: {
    CalendarLesson,
  },
  setup() {
    const usersStore = useUsersStore();
    const lessonStore = useLessonStore()

    return {
      usersStore,
      lessonStore
    };
  },

  data() {
    return {
      dayDates: [
        moment().format("YYYY-MM-DD"),
        moment().add(1, 'days').format("YYYY-MM-DD"),
        moment().add(2, 'days').format("YYYY-MM-DD"),
        moment().add(3, 'days').format("YYYY-MM-DD"),
        moment().add(4, 'days').format("YYYY-MM-DD"),
      ],
      dayNames: [
        moment().format("dddd"),
        moment().add(1, 'days').format("dddd"),
        moment().add(2, 'days').format("dddd"),
        moment().add(3, 'days').format("dddd"),
        moment().add(4, 'days').format("dddd"),
      ],
    }
  },

  methods: {
    getLessonsFromOneDay(day) {
      return this.lessonStore.lessonsByDate.filter(lesson => moment(lesson.date).isSame(moment(day)))
    }
  }
}


</script>

<template>
  <div>
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
            <p class="date-num">{{this.dayDates[0]}}</p>
            <p class="date-day">{{this.dayNames[0]}}</p>
          </div>
          <div class="events">
            <CalendarLesson
              v-for="lesson in getLessonsFromOneDay(this.dayDates[0])"
              :idlesson="lesson.idlesson"
            />
          </div>
        </div>
        <div class="day tues">
          <div class="date">
            <p class="date-num">{{this.dayDates[1]}}</p>
            <p class="date-day">{{this.dayNames[1]}}</p>
          </div>
          <div class="events">
            <CalendarLesson
              v-for="lesson in this.getLessonsFromOneDay(this.dayDates[1])"
              :idlesson="lesson.idlesson"
            />
          </div>
        </div>
        <div class="day wed">
          <div class="date">
            <p class="date-num">{{this.dayDates[2]}}</p>
            <p class="date-day">{{this.dayNames[2]}}</p>
          </div>
          <div class="events">
            <CalendarLesson
                v-for="lesson in this.getLessonsFromOneDay(this.dayDates[2])"
                :idlesson="lesson.idlesson"
            />
          </div>
        </div>
        <div class="day thurs">
          <div class="date">
            <p class="date-num">{{this.dayDates[3]}}</p>
            <p class="date-day">{{this.dayNames[3]}}</p>
          </div>
          <div class="events">
            <CalendarLesson
                v-for="lesson in this.getLessonsFromOneDay(this.dayDates[3])"
                :idlesson="lesson.idlesson"
            />
          </div>
        </div>
        <div class="day fri">
          <div class="date">
            <p class="date-num">{{this.dayDates[4]}}</p>
            <p class="date-day">{{this.dayNames[4]}}</p>
          </div>
          <div class="events">
            <CalendarLesson
                v-for="lesson in this.getLessonsFromOneDay(this.dayDates[4])"
                :idlesson="lesson.idlesson"
            />
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
  font-weight: 100;
  font-size: 2rem;
  line-height: 75px;
}
</style>