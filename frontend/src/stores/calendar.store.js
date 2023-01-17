import {defineStore} from 'pinia';
import {ref} from "vue";

import makeBodyRequest from '@/helpers/apiService';
import router from "../router";
import { useAuthStore } from '@/stores';
import { createToaster } from "@meforma/vue-toaster";

const toasterAlert = createToaster({ /* options */ });

export const useCalendarStore = defineStore('auth', () => {
  const authStore = useAuthStore();

  return {

  }
})