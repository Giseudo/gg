<template>
  <player
    :position="player.position"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Player from '../entities/Player.vue'

export default defineComponent({
  components: {
    Player
  },

  data: () => ({
    player: {
      position: [ 0, 0, -20 ]
    }
  })
})
</script>
