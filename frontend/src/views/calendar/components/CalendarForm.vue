<script>
import {useUsersStore, useLessonStore, useAuthStore} from '@/stores';
import moment from 'moment';

export default {
  name: 'CalendarForm',
  setup() {
    const usersStore = useUsersStore();
    const lessonStore = useLessonStore()
    const userStore = useAuthStore()

    return {
      usersStore,
      lessonStore,
      userStore
    };
  },

  data() {
    return {
      date : moment().format("YYYY-MM-DD"),
      cities: [],
      zones: [],
      rooms: [],
      cityToFilter: '',
      zoneToFilter: '',
    }
  },

  created() {
    this.lessonStore.getAllRooms();
    this.lessonStore.getLessons();
    this.lessonStore.dataForSort = this.lessonStore.lessons;
    this.lessonStore.getLessonByDate(`${this.date}`, this.userStore.userData.iduser);
  },

  methods: {

  },

  mounted() {
    this.cities = [...new Set(this.lessonStore.dataForSort && this.lessonStore.dataForSort.map(item => item.city))];
    this.zones = [...new Set(this.lessonStore.dataForSort && this.lessonStore.dataForSort.map(item => item.description))];
  },
}
</script>

<template>
  <div>
    <Form class="fitCalendar">
      <div class="form-group">
        <label>Lokalizacja</label>
        <select required class="form-control" name="localization" id="localization" @change="event => this.lessonStore.cityToFilter = event.target.value">
          <option :value="true">Wszystkie</option>
          <option
            v-for="city in cities"
            :value="city"
          > {{city}}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Strefa</label>
        <select required class="form-control" name="zone" id="zone" @change="event => this.lessonStore.zoneToFilter = event.target.value">
          <option :value="true">Wszystkie</option>
          <option
              v-for="zone in zones"
              :value="zone"
          > {{zone}}
          </option>
        </select>
      </div>
    </Form>
  </div>
</template>

<style lang="scss">
.fitCalendar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 56%;
  margin: 0 auto;
  height: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0 0 70px rgb(0 0 0 / 30%);
  .form-group {
    width: calc(100%/3);
    display: flex;
    justify-content: space-around;
    flex-wrap: nowrap;
    align-items: center;
    margin-left: 20px;
    label {
      display: block;
      margin-bottom: 5px;
      padding-right: 10px;
      font-size: 14px;
      font-weight: 500;
      color: #333;
    }
    select {
      width: 100%;
      height: 40px;
      padding: 0 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      outline: none;
      font-size: 14px;
      color: #333;
      &:focus {
        border-color: #333;
      }
    }
  }
}
.form-group {
  .submitCalendar {
    padding: 10px 100px;
  }
}
</style>