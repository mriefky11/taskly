<script setup>
import {Text} from 'vue';
import Home from './pages/Home.vue';
</script>

<template>
  <div class="min-h-screen bg-base-200">
    <div class="">
      <Select
        :label="'Category'"
        :options="[
          {value: 'feature', text: 'Feature'},
          {value: 'bug', text: 'Bug'},
          {value: 'improvement', text: 'Improvement'},
          {value: 'test', text: 'Test'},
          {value: 'documentation', text: 'Documentation'},
        ]"
        modelValue=""
        keyField="value"
        textField="text"
      />
      <TextInput
        :label="'Title'"
        :name="title"
        :placeholder="'Enter title here'"
        :value="titleValue"
      />
      <TextArea
        :label="'Description'"
        :name="'description'"
        :placeholder="'Enter description here'"
        value=""
      />
      <DatePicker
        :label="'Due Date'"
        :modelValue="dueDate"
        :placeholder="'Select due date'"
      />
    </div>
  </div>
</template>

<style>
@import './style.css';
</style>
