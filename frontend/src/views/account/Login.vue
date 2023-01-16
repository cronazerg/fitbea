<script>

import { useAuthStore } from '@/stores';

export default {
  name: "Login",
  setup() {
    const authStore = useAuthStore();
    return {
      authStore
    };
  },

  data() {
    return {
      errors: '',
      email: '',
      password: ''
    }
  },

  methods: {
    async login() {
      try {
        await this.authStore.login({
          username: this.email,
          password: this.password,
        });
      } catch (error) {
        console.log(error);
        this.error = error;
        this.password = "";
      }
    }
  }
}
</script>

<template>
  <div class="login_view">
    <div class="card m-3">
      <h4 class="card-header">Zaloguj się</h4>
      <div class="card-body">
        <Form @submit.prevent="this.login()">
          <div class="form-group">
            <label>Email</label>
            <input required name="email" type="text" class="form-control" :class="{ 'is-invalid': errors.email }" @input="event => this.email = event.target.value"/>
            <div class="invalid-feedback">{{ errors.email }}</div>
          </div>
          <div class="form-group">
            <label>Hasło</label>
            <input required name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" @input="event => this.password = event.target.value"/>
            <div class="invalid-feedback">{{ errors.password }}</div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary" :disabled="isSubmitting">
              <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
              Zaloguj
            </button>
            <router-link to="register" class="btn btn-link">Rejestracja</router-link>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .login_view {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .card {
    width: 500px;
  }
</style>
