<template>
  <div class="add-lesson">
    <div class="add-lesson__header">
      <h1 class="add-lesson__title">Dodaj Lekcję</h1>
    </div>
    <div class="add-lesson__body">
      <div class="add-lesson">
      </div>
    </div>
  </div>
  <div class="card-body">
    <Form @submit.prevent="this.onSubmit">
      <div class="form-group">
        <label>Data</label>
        <Datepicker v-model="this.date" :format="formatDay"></Datepicker>
      </div>
      <div class="form-group">
        <label>Godzina rozpoczęcia</label>
        <input name="start_hour" type="number" class="form-control" min="9" max="21" @input="event => this.start_time = event.target.value"/>
      </div>
      <div class="form-group">
        <label>Godzina zakończenia</label>
        <input name="end_hour" type="number" class="form-control" min="9" max="21" @input="event => this.end_time = event.target.value"/>
      </div>
      <div class="form-group">
        <label>Tytuł</label>
        <input name="title" type="text" class="form-control" @input="event => this.title = event.target.value"/>
      </div>
      <div class="form-group">
        <label>Opis</label>
        <input name="description" type="text" class="form-control" @input="event => this.description = event.target.value"/>
      </div>
      <div class="form-group">
        <label>Id pokoju</label>
        <select class="form-control" name="room_idroom" id="room_idroom" @change="event => this.room_idroom = event.target.value">
          <option
              v-for="rooms in lessonStore.rooms"
              :value="rooms.idroom"
          >{{ rooms.idroom }}
          </option
          >
        </select>
      </div>
      <div class="form-group">
        <label>Trener</label>
        <select class="form-control" name="trainer" id="trainer" @change="event => this.trainer = event.target.value">
          <option
              v-for="trainer in lessonStore.trainers"
              :value="trainer.iduser"
          >{{ trainer.name }} {{ trainer.last_name }} id: {{ trainer.iduser }}
          </option
          >
        </select>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="isSubmitting">
          <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
          Stwórz lekcję
        </button>
        <router-link to="/" class="btn btn-link">Wróć</router-link>
      </div>
    </Form>
    <div class="roomList">
      <table id="rooms">
        <thead>
        <tr>
          <th>Adres</th>
          <th>Miato</th>
          <th>Opis</th>
          <th>ID Lokacji</th>
          <th>ID Pokoju</th>
          <th>Nazwa</th>
          <th>Numer Pokoju</th>
          <th>ID Strefy</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="room in lessonStore.rooms" :key="room.idroom">
          <td>{{ room.adress }}</td>
          <td>{{ room.city }}</td>
          <td>{{ room.description }}</td>
          <td>{{ room.idlocation }}</td>
          <td class="roomId">{{ room.idroom }}</td>
          <td>{{ room.name }}</td>
          <td>{{ room.room_number }}</td>
          <td>{{ room.zone_idzone }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {useLessonStore} from '@/stores';
import { ref } from 'vue';
import moment from 'moment';

export default {
  name: "AddLesson",
  components: { Datepicker },

  setup() {
    const lessonStore = useLessonStore();

    const date = ref(new Date());

    const formatDay = (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    return {
      date,
      formatDay,
      lessonStore,
    }
  },

  data() {
    return {
      errors: '',
      date: null,
      start_hour: null,
      end_hour: null,
      room_id: null,
      zone_idzone: null,
      room_idroom: this.lessonStore?.rooms[0]?.idroom,
      idlocation: null,
      idroom: null,
      trainer: null,
      start_time: null,
      end_time: null,
      title: '',
      description: '',
      city: '',
      name: '',
      room_number: '',
    }
  },

  methods: {
    async onSubmit() {
      try {
        await this.lessonStore.createLesson({
          date: moment(this.date).format('YYYY-MM-DD'),
          start_time: parseInt(this.start_time),
          end_time: parseInt(this.end_time),
          title: this.title,
          description: this.description,
          room_idroom: parseInt(this.room_idroom),
          trainer: parseInt(this.trainer)
        });
      } catch (e) {
        this.errors = e.response;
      }
    }
  },

  created() {
    this.lessonStore.getLessons();
    this.lessonStore.getAllRooms();
    this.lessonStore.getAllTrainers();
  }
}

</script>

<style lang="scss">
.add-lesson {
  &__header {
    background-color: #f5f5f5;
    padding: 20px;
    border-bottom: 1px solid #e5e5e5;
  }
  &__title {
    font-size: 24px;
    font-weight: 500;
    margin: 0;
  }
  &__body {
    padding: 20px;
  }
}
.card-body {
  width: 100%;
  display: flex;
  justify-content: space-between;
  form {
    width: 50%;
  }
  .roomList {
    width: 45%;
  }
}

.roomId {
  background: #bebe82;
}

#rooms {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#rooms td, #rooms th {
  border: 1px solid #ddd;
  padding: 8px;
}

#rooms td button {
  background-color: #4b5897;
  border: none;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
}

#rooms td button:hover {
  color: #333;
  background-color: #f2f2f2;
}

#rooms tr:nth-child(even) {
  background-color: #f2f2f2;
}

#rooms tr:hover {
  background-color: #ddd;
}

#rooms th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4b5897;
  color: white;
}
</style>