<script>

import * as Yup from 'yup';
//import {Form, Field} from 'vee-validate';
import { useAuthStore } from '@/stores';

const schema = Yup.object().shape({
  email: Yup.string().required('email is required'),
  password: Yup.string().required('Password is required')
});

export default {
  name: "Login",
  setup() {
    const authStore = useAuthStore();
    return {
      schema,
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
  },

  computed() {

  }
}
</script>

<template>
  <div class="card m-3">
    <h4 class="card-header">Login</h4>
    <div class="card-body">
      <Form @submit.prevent="this.login()">
        <div class="form-group">
          <label>Email</label>
          <input name="email" type="text" class="form-control" :class="{ 'is-invalid': errors.email }" @input="event => this.email = event.target.value"/>
          <div class="invalid-feedback">{{ errors.email }}</div>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" @input="event => this.password = event.target.value"/>
          <div class="invalid-feedback">{{ errors.password }}</div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary" :disabled="isSubmitting">
            <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
            Login
          </button>
          <router-link to="register" class="btn btn-link">Register</router-link>
        </div>
      </Form>
    </div>
  </div>
</template>
