<script>

import {useUsersStore} from '@/stores';

export default {
  name: "Register",
  setup() {
    const usersStore = useUsersStore();
    return {
      usersStore
    };
  },

  data() {
    return {
      errors: '',
      name: '',
      lastName: '',
      email: '',
      phone: '',
      password: ''
    }
  },

  methods: {
    async onSubmit() {
      try {
        await this.usersStore.register({
          name: this.name,
          lastName: this.lastName,
          email: this.email,
          phone: this.phone,
          password: this.password,
        });
      } catch (error) {
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
  <div class="register_view">
    <div class="card m-3">
      <h4 class="card-header">Rejestracja użytkownika</h4>
      <div class="card-body">
        <Form @submit.prevent="this.onSubmit">
          <div class="form-group">
            <label>Imię</label>
            <input required name="name" type="text" class="form-control" :class="{ 'is-invalid': errors.name }"
                   @input="event => this.name = event.target.value"/>
            <div class="invalid-feedback">{{ errors.name }}</div>
          </div>
          <div class="form-group">
            <label>Nazwisko</label>
            <input required name="lastName" type="text" class="form-control" :class="{ 'is-invalid': errors.lastName }"
                   @input="event => this.lastName = event.target.value"/>
            <div class="invalid-feedback">{{ errors.lastName }}</div>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input required name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.email }"
                   @input="event => this.email = event.target.value"/>
            <div class="invalid-feedback">{{ errors.username }}</div>
          </div>
          <div class="form-group">
            <label>Telefon</label>
            <input required name="phone" type="text" class="form-control" :class="{ 'is-invalid': errors.password }"
                   @input="event => this.phone = event.target.value"/>
            <div class="invalid-feedback">{{ errors.phone }}</div>
          </div>
          <div class="form-group">
            <label>Hasło</label>
            <input required name="password" type="password" class="form-control"
                   :class="{ 'is-invalid': errors.password }"
                   @input="event => this.password = event.target.value"/>
            <div class="invalid-feedback">{{ errors.password }}</div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary" :disabled="isSubmitting">
              <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
              Zarejestruj się
            </button>
            <router-link to="login" class="btn btn-link">Wróć</router-link>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
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
