<template>
    <header>
    <img src="~/public/logo.svg" alt="logo">
    <h1>TaskTracker</h1>
  </header>
  <main>
    <Users />
    <div class="well">
      <Board />
    </div>
  </main>
</template>

<style lang="scss">
  header {
    height: 64px;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: $secondary-backround;

    h1 {
      display: flex;
      color: $primary-color;
    }

    & img {
      height: 100%;
    }
  }

  main {
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: $primary-backround;
    padding: 24px 64px;
    flex-grow: 1;

    & .well {
      min-height: 512px;
      border: 1px solid $border-color;
      border-radius: 8px;
      background: $gradient-backround;
      padding: 24px;
    }
  }
</style>