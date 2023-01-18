<script>
import {useUsersStore, useLessonStore, useAuthStore} from '@/stores';
import moment from 'moment';

export default {
  name: 'CalendarLesson',
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
    }
  },

  methods: {

  },

  created() {
    this.lessonStore.getLessonByDate(`${this.date}`, this.userStore.userData.iduser);
    this.lessonStore.getAllRooms();
  }
}
</script>

<template>
  <div>
    <Form class="fitCalendar">
      <div class="form-group">
        <label>Lokalizacja</label>
        <select required class="form-control" name="localization" id="localization">
          <option
              :value="Katowice"
          > Katowice
          </option
          >
        </select>
      </div>
      <div class="form-group">
        <label>Strefa</label>
        <select required class="form-control" name="zone" id="zone">
          <option
              :value="Katowice"
          > Katowice
          </option
          >
        </select>
      </div>
      <div class="form-group">
        <label>Sala</label>
        <select required class="form-control" name="room" id="room">
          <option
              :value="Katowice"
          > Katowice
          </option
          >
        </select>
      </div>
      <div class="form-group">
        <button class="submitCalendar btn btn-primary" :disabled="isSubmitting">
          <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
          Szukaj
        </button>
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
  width: 70%;
  margin: 0 auto;
  height: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0 0 70px rgb(0 0 0 / 30%);
  .form-group {
    width: calc(100%/5);
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