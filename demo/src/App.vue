<script setup lang="ts">
import BasicEditor from './components/BasicEditor.vue'
</script>

<template>
  <div class="container">
    <BasicEditor />
  </div>
</template>

<style>
html,
button,
input,
textarea {
  font-family: system-ui, sans-serif;
  font-size: 14px;
}
body {
  margin: 0;
  padding: 0;
  padding: 30px;
  font-size: 14px;
  text-rendering: optimizeSpeed;
}
.container {
  max-width: 1060px;
  width: 100%;
  margin: auto;
}
.text-label {
  text-transform: uppercase;
  color: slategray;
}
button + button {
  margin-left: 10px;
}
</style>
