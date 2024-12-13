<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
  isEdit: {
    type: Boolean,
    required: false
  }
});

const emits = defineEmits(['close', 'confirm', 'remove']);

const closeModal = () => emits('close');
const remove = () => emits('remove');
const confirm = () => emits('confirm');
</script>

<template>
  <div class="modal" v-if="isOpen">
    <div class="modal__overlay" @click="closeModal"></div>
    <div class="modal__content">
      <header class="modal__header">
        <h2>{{ title }}</h2>
        <button @click="closeModal" class="modal__close">✖</button>
      </header>
      <div class="modal__body">
        <slot></slot>
      </div>
      <footer class="modal__footer">
        <button @click="confirm" class="modal__confirm button">Confirm</button>
        <button v-if="props.isEdit" @click="remove" class="modal__delete button">Delete</button>
        <button @click="closeModal" class="modal__cancel button">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;

    &--small {
      & .modal__content {
        width: auto;
        height: auto;
      }
    }

    &__overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background: transparent;
    }

    &__content {
      padding: 20px;
      border-radius: 8px;
      width: 80dvw;
      height: 80dvh;
      position: relative;
      background-color: $primary-backround;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__body {
      flex-grow: 1;
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }

    &__close {
      background: none;
      border: none;
      cursor: pointer;
    }

    &__confirm,
    &__cancel,
    &__delete {
      padding: 10px 20px;
      border: none;
      cursor: pointer;
    }

    &__confirm {
      background-color: $success-color;
    }

    &__delete {
      background-color: $dark-primary-color;
    }

    &__cancel {
      background-color: $secondary-backround;
    }
  }

  .button {
    transition: box-shadow 0.2s linear;
    cursor: pointer;
    color: $primary-text-color;

    &:hover {
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
  }
</style>
