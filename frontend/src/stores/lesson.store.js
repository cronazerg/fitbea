import {defineStore} from 'pinia';
import {ref} from "vue";
import moment from "moment";

import router from "../router";
import {createToaster} from "@meforma/vue-toaster";
import { useAuthStore } from '@/stores';

const toasterAlert = createToaster({ /* options */});

export const useLessonStore = defineStore('lesson', () => {
  let lessons = ref([]);
  let rooms = ref([]);
  let trainers = ref([]);
  let lessonsByDate = ref([]);

  let cityToFilter = ref('');
  let zoneToFilter = ref('');

  const todayDate = moment().format('YYYY-MM-DD');

  const authStore = useAuthStore();

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

  const getLessonByDate = async (date, iduser) => {
    try {
      await fetch(`http://localhost:8000/lessons/'${date}'/${iduser}`, {
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
      }).then((response) => {
        if (response.status === 201) {
          toasterAlert.success('Lekcja została utworzona');
          router.push({name: "addLesson"});
        } else {
          toasterAlert.error('Napotkano niespotykany błąd');
        }
      })
    } catch (error) {
      throw new Error(error);
    }
  }

  const singUpToLesson = async (iduser, idlesson) => {
    try {
      await fetch(`http://localhost:8000/lessons/singIn/${idlesson}/${iduser}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.status === 200) {
          toasterAlert.success('Zostałeś zapisany na lekcję');
          getLessons();
          getLessonByDate(todayDate, authStore?.userData?.iduser)
        } else {
          toasterAlert.error('Napotkano niespotykany błąd');
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  const singOffFromLesson = async (iduser, idlesson) => {
    try {
      await fetch(`http://localhost:8000/lessons/singOut/${idlesson}/${iduser}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.status === 200) {
          toasterAlert.success('Zostałeś wypisany z lekcji');
          getLessons();
          getLessonByDate(todayDate, authStore?.userData?.iduser)
        } else {
          toasterAlert.error('Napotkano niespotykany błąd');
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  return {getLessons, createLesson, lessons, getAllRooms, rooms, getAllTrainers, trainers, getLessonByDate, lessonsByDate, singUpToLesson, singOffFromLesson, cityToFilter, zoneToFilter}
});
