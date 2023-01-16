<script>

import {useUsersStore, useAlertStore} from '@/stores';

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
  },

  computed() {

  }
}

</script>

<template>
  <div class="card m-3">
    <h4 class="card-header">Register</h4>
    <div class="card-body">
      <Form @submit.prevent="this.onSubmit">
        <div class="form-group">
          <label>First Name</label>
          <input name="name" type="text" class="form-control" :class="{ 'is-invalid': errors.name }"
                 @input="event => this.name = event.target.value"/>
          <div class="invalid-feedback">{{ errors.name }}</div>
        </div>
        <div class="form-group">
          <label>Last Name</label>
          <input name="lastName" type="text" class="form-control" :class="{ 'is-invalid': errors.lastName }"
                 @input="event => this.lastName = event.target.value"/>
          <div class="invalid-feedback">{{ errors.lastName }}</div>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.email }"
                 @input="event => this.email = event.target.value"/>
          <div class="invalid-feedback">{{ errors.username }}</div>
        </div>
        <div class="form-group">
          <label>Telefon</label>
          <input name="phone" type="text" class="form-control" :class="{ 'is-invalid': errors.password }"
                 @input="event => this.phone = event.target.value"/>
          <div class="invalid-feedback">{{ errors.phone }}</div>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }"
                 @input="event => this.password = event.target.value"/>
          <div class="invalid-feedback">{{ errors.password }}</div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary" :disabled="isSubmitting">
            <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
            Register
          </button>
          <router-link to="login" class="btn btn-link">Cancel</router-link>
        </div>
      </Form>
    </div>
  </div>
</template>
