<template>
  <player :position="player.position" />
  <server />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Vector3 } from 'three'
import { Player, Server } from '../entities'
import { injectStrict } from '../utils'
import * as types from '../types'

export default defineComponent({
  components: {
    Player,
    Server
  },

  setup () {
    // Create camera service?
    // export getMainCamera function
    const camera = injectStrict(types.GET_CAMERA)

    return { camera }
  },

  data: () => ({
    player: {
      position: [ 0, 0, -20 ]
    }
  }),

  mounted () {
    const [ x, y, z ] = this.player.position

    // FIXME this.camera is not the main camera
    this.camera.position.setY(5)
    this.camera.lookAt(new Vector3(x, y, z))
  }
})
</script>
