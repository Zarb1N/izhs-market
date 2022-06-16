<template>
  <div class="p-hint">
    <slot></slot>
  </div>
</template>

<style>
  .p-hint {
    position: fixed;
    padding: 10px;
    background: #FFFFFF;
    box-shadow: 0px 0px 1px rgba(26, 32, 36, 0.32), 0px 40px 64px rgba(91, 104, 113, 0.24);
    border-radius: 10px;
    outline: none;
    width: 100%;
    max-width: 50%;
  }
</style>