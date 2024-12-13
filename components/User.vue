<script setup lang="ts">
import type { User } from '~/types';

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
})
</script>

<template>
  <div class="user">{{ props.user.abbreviation }}</div>
</template>

<style scoped lang="scss">
.user {
  background-color: rgb(78, 19, 29);
  border-radius: 50%;
  padding: 11px;
  font-weight: bold;
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &--small {
    width: 28px;
    height: 28px;
    padding: 6px;
    font-size: 0.7em;
  }
}
</style>