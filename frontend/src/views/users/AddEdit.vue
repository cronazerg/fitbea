<script>
import {useUsersStore, useAuthStore} from '@/stores';
import dayjs from "dayjs";
import typeEnum from "./enum";

export default {
  name: "addEdit",
  setup() {
    const userStore = useUsersStore();
    const authStore = useAuthStore();
    const rolesIdEnums = typeEnum;
    return {
      userStore,
      authStore,
      rolesIdEnums
    };
  },

  data() {
    const userStore = useUsersStore();
    return {
      usersData: null,
      users: [],
      errors: '',
      id: userStore.userToEdit.id,
      role: 2,
      name: '',
      lastName: '',
      email: '',
      phone: '',
      edit_by: userStore.userToEdit.edit_by
    }
  },

  methods: {
    async onSubmit() {
      try {
        await this.userStore.updateUserDataById(this.id, {
          role: parseInt(this.role),
          name: this.name,
          lastName: this.lastName,
          email: this.email,
          phone: this.phone,
          password: this.password,
          edit_by: this.edit_by
        });
      } catch (error) {
        this.role = null;
        this.name = "";
        this.lastName = "";
        this.email = "";
        this.phone = "";
        this.password = "";
      }
    }
  }
}

</script>

<template>
  <div class="changeData">
    <h1 class="mainHeader">Zmień dane użytkownika</h1>
    <div class="card m-3">
      <h4 class="card-header">Zmiana danych użytkownika użytkownika id: <b>{{ userStore.userToEdit.id }}</b></h4>
      <div class="card-body">
        <Form @submit.prevent="this.onSubmit">
          <div class="form-group">
            <label>Zmień rolę z: <b>{{ userStore.userToEdit.role_idrole }}</b> na:</label>
            <select required class="form-control" name="role" id="role" @change="event => this.role = event.target.value">
              <option
                  v-for="role in rolesIdEnums"
                  :value="role.id"
              >{{ role.name }}
              </option
              >
            </select>
          </div>
          <div class="form-group">
            <label>Zmień imię z: <b>{{ userStore.userToEdit.name }}</b> na:</label>
            <input required name="name" type="text" class="form-control" :class="{ 'is-invalid': errors.name }"
                   @input="event => this.name = event.target.value"
                   placeholder="Imię"
            />
            <div class="invalid-feedback">{{ errors.name }}</div>
          </div>
          <div class="form-group">
            <label>Zmień nazwisko z: <b>{{ userStore.userToEdit.lastName }}</b> na:</label>
            <input required name="lastName" type="text" class="form-control" :class="{ 'is-invalid': errors.lastName }"
                   @input="event => this.lastName = event.target.value"
                   placeholder="Nazwisko"
            />
            <div class="invalid-feedback">{{ errors.lastName }}</div>
          </div>
          <div class="form-group">
            <label>Zmień email z: <b>{{ userStore.userToEdit.email }}</b> na:</label>
            <input required name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.email }"
                   @input="event => this.email = event.target.value"
                   placeholder="Email"
            />
            <div class="invalid-feedback">{{ errors.username }}</div>
          </div>
          <div class="form-group">
            <label>Zmień telefon z: <b>{{ userStore.userToEdit.phone }}</b> </label>
            <input required name="phone" type="text" class="form-control" :class="{ 'is-invalid': errors.password }"
                   @input="event => this.phone = event.target.value"
                   placeholder="Telefon"
            />
            <div class="invalid-feedback">{{ errors.phone }}</div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary" :disabled="isSubmitting">
              <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
              Zmień dane
            </button>
            <router-link to="/users" class="btn btn-link">Wróć</router-link>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.mainHeader {
  padding: 20px 25px;
}

.changeData {
  padding: 30px;
}

.register_view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.card {
  width: 800px;
}
</style>