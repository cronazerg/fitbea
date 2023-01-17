<script>
import {useUsersStore} from '@/stores';

export default {
  name: 'CalendarLesson',
  setup() {
    const usersStore = useUsersStore();

    return {
      usersStore
    };
  }
}


</script>

<template>
  <div>
    <div class="club-schedule-item" data-trainer="adam_ptak" data-category="">Wzmacniające
      <ul class="icons">
        <li><i class="fas fa-user"></i> <span>Adam Hak</span></li>
        <li><i class="fas fa-clock"></i> <span>17:00 - 17:45</span></li>
        <li><i class="fas fa-map-marker-alt"></i> <span>Sopot Centrum</span></li>
      </ul>
      <b> 09:00 - 09:55</b>
      <div class="icons" id="a523770">
        Brak miejsc
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.club-schedule-item {
  background: #333;
  color: #fff;
  width: calc(100%/7);
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
  &.active {
    background: #f5f5f5;
    border: 1px solid #e5e5e5;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
  &.disabled {
    background: #f5f5f5;
    border: 1px solid #e5e5e5;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    cursor: not-allowed;
  }
  &.active.disabled {
    background: #f5f5f5;
    border: 1px solid #e5e5e5;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    cursor: not-allowed;
  }
  &.active.disabled:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
  &.active:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
  &.disabled:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
  &.active.disabled:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
  &.active:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
  &.disabled:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>