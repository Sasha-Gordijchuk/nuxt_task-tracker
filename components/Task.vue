<script setup lang="ts">
  import { Priority, type Task } from '~/types';

  const props = defineProps({
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  })
</script>

<template>
  <div :id="`task-${task.id}`" class="task">
    <div class="task__primary-content">
      <h4 class="task__title">{{ task.title }}</h4>
      <img v-if="task.priority === Priority.LOW" src="~/assets/icons/low.svg">
      <img v-else-if="task.priority === Priority.HIGH" src="~/assets/icons/high.svg">
      <img v-else src="~/assets/icons/medium.svg">
    </div>
    <div class="task__secondary-content">
      <p class="task__id">{{ task.id }}</p>
      <User
        v-for="user in task.assigned"
        :key="user.id"
        :user="user"
        :title="user.name"
        class="user--small"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.task {
  border: 1px solid $border-color;
  border-radius: 4px;
  padding: 4px;
  background: $secondary-backround;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;

  &__id {
    font-size: 0.9em;
    font-weight: bold;
  }

  &__primary-content {
    display: flex;
    justify-content: space-between;
    align-items: start;

    & img {
      width: 32px;
      height: 32px;
    }
  }

  &__secondary-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 36px;
  }
}
</style>