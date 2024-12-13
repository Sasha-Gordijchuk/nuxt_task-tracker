<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import type { User } from '~/types';

const props = defineProps({
  users: {
    type: Array as PropType<User[]>,
    required: true
  }
});

const isMenuOpen = ref<boolean>(false);
const dropdown = ref<HTMLDivElement | null>(null);

const emit = defineEmits(['select-user']);

const selectUser = (user: User) => {
  emit('select-user', user);
  isMenuOpen.value = false;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdown.value && event.target instanceof Node && !dropdown.value.contains(event.target)) {
    isMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="dropdown" ref="dropdown">
    <button type="button" @click="toggleMenu" class="dropdown__button">+</button>
    <div v-if="isMenuOpen" class="dropdown__content">
      <span
      v-for="user in props.users"
      :key="user.id"
      @click="selectUser(user)"
      class="dropdown__item">{{ user.name }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dropdown {
  position: relative;
  display: inline-block;

  &__button {
  height: 46px;
  width: 46px;
  border-radius: 50%;
  border: 1px solid $primary-text-color;
  color: $primary-text-color;
  cursor: pointer;
  font-size: 1.5em;
}

&__content {
  display: block;
  position: absolute;
  background-color: $primary-backround;
  min-width: 160px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border: 1px solid $primary-text-color;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: scroll;
}

&__item {
  color: $primary-text-color;
  padding: 12px 16px;
  display: block;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: $secondary-backround;
  }
}
}
</style>