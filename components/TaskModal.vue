<script setup lang="ts">
import { useTaskStore } from '~/store/tasks';
import { useUserStore } from '~/store/users';
import { Priority, Status, type Task, type User} from '~/types';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  isEdit: {
    type: Boolean,
    required: true
  },
  defaultStatus: {
    type: String as PropType<Status>,
    required: false
  },
  task: {
    type: Object as PropType<Task>,
    required: false
  }
});

const userStore = useUserStore();
const taskStore = useTaskStore();
const allUsers = computed(() => userStore.users);
const selectedPriority = ref<Priority>(Priority.MEDIUM);
const selectedStatus = ref<Status>(Status.TODO);
const taskForm = ref<HTMLFormElement | null>(null);
const assignedUsers = ref<User[]>([])

const priorityOptions = Object.fromEntries(
  Object.entries(Priority).map(([key, value]) => [
    key,
    value,
  ])
);

const statusOptions = Object.fromEntries(
  Object.entries(Status).map(([key, value]) => [
    key,
    value,
  ])
);

const emit = defineEmits(['close-task-modal']);

const tempTask = reactive({
  title: '',
  description: '',
  priority: selectedPriority,
  status: selectedStatus,
  assigned: assignedUsers,
});

const closeTaskModal = () => {
  emit('close-task-modal');
}

const createTask = () => {
  taskStore.addTask(tempTask);
  assignedUsers.value = [];
  closeTaskModal();
};

const updateTask = (task: Partial<Task>) => {
  if (props.task) {
    taskStore.updateTask(props.task.id, task);
    closeTaskModal();
  }
}

const removeTask = () => {
  if (props.task) {
    taskStore.removeTask(props.task?.id);
    closeTaskModal();
  }
}

const formSubmit = () => {
  if (taskForm.value && taskForm.value.reportValidity()) {
    if (props.isEdit) {
      updateTask(tempTask);
    } else {
      createTask();
    }
  }
}

const availableUsers = computed(() =>
  allUsers.value.filter(user => !assignedUsers.value.some(u => u.id === user.id))
);

const handleUserAssign = (user: User) => {
  assignedUsers.value.push(user);
};

const unassignUser = (user: User) => {
  assignedUsers.value = assignedUsers.value.filter(u => u.id !== user.id);
}

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      if (props.task) {
        tempTask.title = props.task.title;
        tempTask.description = props.task.description || '';
        selectedPriority.value = props.task.priority;
        selectedStatus.value = props.task.status;
        tempTask.assigned = props.task.assigned;
      } else {
        tempTask.title = '';
        tempTask.description = '';
        selectedPriority.value = Priority.MEDIUM;
        if (props.defaultStatus) {
          selectedStatus.value = props.defaultStatus;
        }
      }
    }
  }
);
</script>

<template>
  <Modal
    title="Create Task"
    :isOpen="props.isOpen"
    :isEdit="props.isEdit"
    @close="closeTaskModal"
    @confirm="formSubmit"
    @remove="removeTask"
  >
    <form ref="taskForm" class="form" @submit.prevent="formSubmit">
      <div class="form__content">
        <div class="form__content-primary-part">
          <input
            class="form__title"
            v-model="tempTask.title"
            required
            placeholder="Enter task title"
          />
          <textarea
            class="form__description"
            v-model="tempTask.description"
            placeholder="Enter task description"
          ></textarea>
        </div>
        <div class="form__content-secondary-part">
          <label for="priority-select" class="form__label">
            Priority:
            <select
              v-model="selectedPriority"
              class="form__select"
              id="priority-select"
              aria-label="Select priority"
            >
              <option
                v-for="(label, value) in priorityOptions"
                :key="value"
                :value="label"
              >
                {{ label }}
              </option>
            </select>
          </label>
          <label for="status-select" class="form__label">
            Status:
            <select
              v-model="selectedStatus"
              class="form__select"
              id="status-select"
              aria-label="Select status"
            >
              <option
                v-for="(label, value) in statusOptions"
                :key="value"
                :value="label"
              >
                {{ label }}
              </option>
            </select>
          </label>
          Assigned Users:
          <div class="form__assigned-users">
            <User
              v-for="user in assignedUsers"
              :key="user.id"
              :user="user"
              @click="unassignUser(user)"
              class="form__assigned-user"
            />
            <UserDropdown
              v-if="availableUsers.length"
              :users="availableUsers"
              @select-user="handleUserAssign"
            />
          </div>
        </div>
      </div>
    </form>
  </Modal>
</template>

<style scoped lang="scss">
  .form {
    height: 100%;

    &__content {
      display: flex;
      flex-direction: row;
      height: 100%;
      gap: 36px;
    }

    &__content-primary-part {
      display: flex;
      flex-direction: column;
      gap: 1em;
      height: 100%;
      flex-basis: 65%;
    }

    &__content-secondary-part {
      display: flex;
      flex-direction: column;
      gap: 1em;
      height: 100%;
      flex-basis: 35%;
    }

    &__title {
      font-size: 1.5em;
    }

    &__description {
      width: 100%;
      height: 100%;
      resize: none;
      overflow-y: auto;
    }

    &__label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      gap: 8px;
    }

    &__select {
      flex-basis: 70%;
    }

    &__assigned-users {
      display: flex;
      gap: 8px;
    }

    &__assigned-user {
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        color: rgba(0, 0, 0, 0.1);
        transform: scale(1.05);

        &::before {
          content: '-';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          font-size: 1.5em;
          font-weight: bold;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
</style>