<script setup lang="ts">
import Theme from 'vitepress/theme'
import { Analytics } from '@vercel/analytics/vue'
</script>

<template>
  <div class="LayoutWrapper">
    <Theme.Layout />
    <Analytics />
  </div>
</template>

<style scoped>
</style>