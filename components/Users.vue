<script setup lang="ts">
import { useUserStore } from '~/store/users';
import type { User } from '~/types';

const isUserModalOpen = ref<boolean>(false);
const isUserEdit = ref<boolean>(false);
const updatedUser = ref<User | undefined>(undefined);
const userStore = useUserStore();

const createUserModal = () => {
  isUserModalOpen.value = true;
  isUserEdit.value = false;
  updatedUser.value = undefined;
}

const updateUser = (user: User) => {
  isUserModalOpen.value = true;
  isUserEdit.value = true;
  updatedUser.value = user;
}

const closeUserModal = () => {
  isUserModalOpen.value = false;
};
</script>

<template>
  <div class="space-between">
    <div class="users">
      <User
        v-for="user in userStore.users"
        :key="user.id"
        :user="user"
        :title="user.name"
        @click="updateUser(user)"
      />
    </div>
    <button class="users__add-button" @click="createUserModal">
      <p>+</p> Add User
    </button>
    <UserModal
      :isOpen="isUserModalOpen"
      :isEdit="isUserEdit"
      :user="updatedUser"
      @close-user-modal="closeUserModal"
    />
  </div>
</template>

<style scoped lang="scss">
  .users {
    display: flex;
    flex-direction: row;
    gap: 4px;

    &__add-button {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 4px;

      &:hover {
        background: $secondary-backround;
        cursor: pointer;
      }

      & p {
        font-size: 1.5em;
      }
    }
  }
</style>