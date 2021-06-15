<template>
  <g-viewport class="viewport" :color="0xff0000" @loaded="onLoad">
    <g-camera />
    <router-view v-if="!isLoading" />
  </g-viewport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { GCamera, GViewport } from './core'
import { provideServices } from './services'

export default defineComponent({
  name: 'App',

  setup () {
    provideServices()
  },

  components: {
    GCamera,
    GViewport
  },

  data: () => ({
    isLoading: true
  }),

  methods: {
    onLoad () {
      this.isLoading = false
    }
  }
})
</script>

<style>
.viewport {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.minimap {
  position: absolute;
  top: 40px;
  right: 40px;
  width: 300px;
  height: 300px;
}
</style>
