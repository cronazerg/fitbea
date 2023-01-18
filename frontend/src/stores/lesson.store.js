import {defineStore} from 'pinia';
import {ref} from "vue";

import router from "../router";
import {useAuthStore} from '@/stores';
import {createToaster} from "@meforma/vue-toaster";

const toasterAlert = createToaster({ /* options */});

export const useLessonStore = defineStore('lesson', () => {
  const lessons = ref([]);
  const rooms = ref([]);
  const trainers = ref([]);
  const lessonsByDate = ref([]);

  const getLessons = async () => {
    try {
      await fetch('http://localhost:8000/lessons', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        // wait for the response
        .then((response) => response.json())
        .then((data) => {
          lessons.value = data.lessons;
        })

    } catch (error) {
      throw new Error(error);
    }
  }

  const getLessonByDate = async (date) => {
    try {
      await fetch(`http://localhost:8000/lessons/'${date}'`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        // wait for the response
        .then((response) => response.json())
        .then((data) => {
          lessonsByDate.value = data.lessons;
        })

    } catch (error) {
      throw new Error(error);
    }
  }

  const getAllRooms = async () => {
    try {
      await fetch('http://localhost:8000/lessons/rooms', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        // wait for the response
        .then((response) => response.json())
        .then((data) => {
          rooms.value = data.rooms;
        })

    } catch (error) {
      throw new Error(error);
    }
  }

  const getAllTrainers = async () => {
    try {
      await fetch('http://localhost:8000/lessons/trainers', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((data) => {
          trainers.value = data.trainers;
        })

    } catch (error) {
      throw new Error(error);
    }
  }

  const createLesson = async ({date, start_time, end_time, title, description, room_idroom, trainer}) => {
    try {
      await fetch('http://localhost:8000/lessons', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: date,
          start_time: start_time,
          end_time: end_time,
          title: title,
          description: description,
          room_idroom: room_idroom,
          iduser: trainer
        })
      }).then(async () => {
        await router.push({name: "users"});
      })
    } catch (error) {
      throw new Error(error);
    }
  }

  return {getLessons, createLesson, lessons, getAllRooms, rooms, getAllTrainers, trainers, getLessonByDate, lessonsByDate}
});
