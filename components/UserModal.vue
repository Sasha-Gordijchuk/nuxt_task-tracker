<script setup lang="ts">
import { useTaskStore } from '~/store/tasks';
import { useUserStore } from '~/store/users';
import type { User } from '~/types';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  isEdit: {
    type: Boolean,
    required: true
  },
  user: {
    type: Object as PropType<User>,
    required: false
  }
});

const userStore = useUserStore();
const taskStore = useTaskStore();
const userForm = ref<HTMLFormElement | null>(null);
const emit = defineEmits(['close-user-modal']);

const tempUser = reactive({
  name: '',
});

const closeUserModal = () => {
  emit('close-user-modal');
};

const createUser = () => {
  userStore.addUser(tempUser.name)
  closeUserModal();
};

const updateUser = (user: Partial<User>) => {
  if (props.user) {
    userStore.updateUser(props.user.id, user);
    taskStore.updateUserTasks(userStore.getUserById(props.user.id))
    closeUserModal();
  }
}

const removeUser = () => {
  if (props.user) {
    userStore.removeUser(props.user?.id);
    taskStore.clearAssignedUser(props.user?.id);
    closeUserModal();
  }
}

const formSubmit = () => {
  if (userForm.value && userForm.value.reportValidity()) {
    if (props.isEdit) {
      updateUser(tempUser);
    } else {
      createUser();
    }
  }
}

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      if (props.user) {
        tempUser.name = props.user.name;
      } else {
        tempUser.name = '';
      }
    }
  }
);

</script>

<template>
  <Modal
    title="Add User"
    :isOpen="props.isOpen"
    :isEdit="props.isEdit"
    @close="closeUserModal"
    @confirm="formSubmit"
    @remove="removeUser"
    class="modal--small"
  >
    <form ref="userForm" class="form" @submit.prevent="createUser">
      <div class="form__content">
        <input
          v-model="tempUser.name"
          required
          placeholder="Enter User Name"
        />
      </div>
    </form>
  </Modal>
</template>

<style scoped lang="scss">
.form {
  &__content {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 264px;
  }
}
</style>