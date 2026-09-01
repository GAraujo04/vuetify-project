<template>
      <v-text-field
      :rules="rules"
      label="Add Task"
      v-model="taskStore.titleTaskCreating"
      @keyup.enter="taskStore.addTask"
    ></v-text-field>

    <ListTasks/>
</template>

<script setup>
import { onMounted } from 'vue';
import ListTasks from './ListTasks.vue';
import { useTaskStore } from '@/stores/task'

const taskStore = useTaskStore();

onMounted(() => {
    taskStore.getTasks();
})

const rules = [
    value => {
      if (!value || value.length >= 5) return true
      return 'You must enter Task with mot then 5 characters.'
    },
  ]
</script>