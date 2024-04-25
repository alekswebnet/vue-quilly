<script setup lang="ts">
import BasicEditor from './components/BasicEditor.vue'
// import BubbleEditor from './components/BubbleEditor.vue'
</script>

<template>
  <div class="container">
    <BasicEditor />
    <!-- <BubbleEditor /> -->
  </div>
</template>

<style>
html,
button,
input,
textarea {
  font-family: system-ui, sans-serif;
}
body {
  margin: 0;
  padding: 0;
  padding: 30px;
  text-rendering: optimizeSpeed;
}
.container {
  max-width: 1060px;
  width: 100%;
  margin: auto;
}
.text-label {
  font-size: 0.9rem;
  text-transform: uppercase;
  color: slategray;
}
</style>
