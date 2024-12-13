<script setup lang="ts">
import draggable from "vuedraggable";
import { useTaskStore } from '~/store/tasks';
import { Status, type Task } from '~/types';

const props = defineProps({
  columnName: {
    type: String as PropType<Status>,
    required: true,
  },
})

const emit = defineEmits(['create-task-modal', 'update-task-modal']);
const taskStore = useTaskStore();
const columnTasks = computed(() => taskStore.tasksByStatus(props.columnName));

const openModal = (columnName: Status) => {
  emit('create-task-modal', columnName);
};

const updateTask = (task: Task) => {
  emit('update-task-modal', task);
}

const onDragEnd = (evt: {
  newIndex: number;
  oldIndex: number;
  from: HTMLElement;
  to: HTMLElement;
  item: HTMLElement
}) => {
  const { newIndex, oldIndex, from, to, item } = evt;
  const fromColumn = from.id.substring(from.id.indexOf('-') + 1);
  const toColumn = to.id.substring(to.id.indexOf('-') + 1);
  const taskId = item.id.substring(item.id.indexOf('-') + 1);

  if (fromColumn !== toColumn) {
    const newColumnName = Status[toColumn.toUpperCase() as keyof typeof Status]
    taskStore.updateTask(taskId, {status: newColumnName});
    const newColumnTasks = taskStore.tasksByStatus(Status[toColumn.toUpperCase() as keyof typeof Status]);

    taskStore.updatePosition(taskId, newIndex);
    newColumnTasks.map((task) => {
      if (task.columnPosition >= newIndex && task.id !== taskId) {
        taskStore.updatePosition(task.id, task.columnPosition + 1);
      }
    });

    columnTasks.value.map((task) => {
      if (task.columnPosition >= oldIndex) {
        taskStore.updatePosition(task.id, task.columnPosition - 1);
      }
    });

  } else {
    columnTasks.value.forEach((task, index) => {
      taskStore.updatePosition(task.id, index);
    });
  }
};

</script>

<template>
  <div class="column">
    <h3 class="column__header">
      {{ columnName }}
    </h3>
    <div class="tasks">
      <draggable
        :list="columnTasks"
        item-key="id"
        group="tasks"
        :disabled="false"
        @end="onDragEnd"
        :id="`column-${columnName}`"
      >
        <template #item="{ element }">
          <Task
            :task="element"
            @click="updateTask(element)"
          />
        </template>
      </draggable>
    </div>
    <button class="column__add-button" @click="openModal(props.columnName)">
      <p>+</p> Add a Card
    </button>
  </div>
</template>

<style scoped lang="scss">
.column {
  border: 1px solid $border-color;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-color: $primary-backround;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__header {
    text-transform: uppercase;
    color: $primary-text-color;
    padding: 0 8px;
  }

  &__add-button {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border-radius: 4px;
    width: 100%;

    &:hover {
      background: $secondary-backround;
      cursor: pointer;
    }

    & p {
      font-size: 1.5em;
    }
  }
}

.tasks {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>