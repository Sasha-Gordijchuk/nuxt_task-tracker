<script setup lang="ts">
import { Status, type Task } from '~/types';

const isTaskModalOpen = ref<boolean>(false);
const isTaskEdit = ref<boolean>(false);
const defaultStatus = ref<Status>(Status.TODO);
const updatedTask = ref<Task | undefined>(undefined);

const createTaskModal = (columnName: Status) => {
  isTaskModalOpen.value = true;
  isTaskEdit.value = false;
  defaultStatus.value = columnName;
  updatedTask.value = undefined;
};

const updateTaskModal = (task: Task) => {
  isTaskEdit.value = true;
  isTaskModalOpen.value = true;
  updatedTask.value = task;
}

const closeTaskModal = () => {
  isTaskModalOpen.value = false;
};

</script>

<template>
  <div class="board">
    <Column
      v-for="column in Object.values(Status)"
      :key="column"
      :columnName="column"
      @create-task-modal="createTaskModal"
      @update-task-modal="updateTaskModal"
    />
    <TaskModal
      :isOpen="isTaskModalOpen"
      :isEdit="isTaskEdit"
      :defaultStatus="defaultStatus"
      :task="updatedTask"
      @close-task-modal="closeTaskModal"
    />
  </div>
</template>

<style scoped lang="scss">
  .board {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
  }
</style>