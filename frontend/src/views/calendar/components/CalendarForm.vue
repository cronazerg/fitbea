<script setup>
import {useAuthStore} from '@/stores';

const authStore = useAuthStore();
</script>

<template>
  <div>
    <Form class="fitCalendar">
      <div class="form-group">
        <label>Lokalizacja</label>
        <select required class="form-control" name="localization" id="localization">
          <option
              :value="Katowice"
          > Katowice
          </option
          >
        </select>
      </div>
      <div class="form-group">
        <label>Trener</label>
        <select required class="form-control" name="localization" id="localization">
          <option
              :value="Katowice"
          > Katowice
          </option
          >
        </select>
      </div>
      <div class="form-group">
        <label>Strefa</label>
        <select required class="form-control" name="localization" id="localization">
          <option
              :value="Katowice"
          > Katowice
          </option
          >
        </select>
      </div>
      <div class="form-group">
        <label>Sala</label>
        <select required class="form-control" name="localization" id="localization">
          <option
              :value="Katowice"
          > Katowice
          </option
          >
        </select>
      </div>
    </Form>
  </div>
</template>

<style lang="scss">
.fitCalendar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  .form-group {
    width: calc(100%/5);
    display: flex;
    justify-content: space-around;
    flex-wrap: nowrap;
    align-items: center;
    label {
      display: block;
      margin-bottom: 5px;
      padding-right: 10px;
      font-size: 14px;
      font-weight: 500;
      color: #333;
    }
    select {
      width: 100%;
      height: 40px;
      padding: 0 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      outline: none;
      font-size: 14px;
      color: #333;
      &:focus {
        border-color: #333;
      }
    }
  }
}
</style>