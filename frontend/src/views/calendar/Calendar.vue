<script>

import {useUsersStore} from '@/stores';

export default {
  name: "Calendar",
  setup() {
    const usersStore = useUsersStore();
    return {
      usersStore
    };
  },

  data() {

  },

  methods: {

  }
}

</script>

<template>
  <div class="card m-3">

  </div>
</template>
