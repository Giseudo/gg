<template>
  <g-entity
    :object="mesh"
    v-model:position="position"
  >
    <g-input-reader ref="inputReader"
      @primary-axis="onAxisChange"
    />

    <g-movement ref="movement"
      :max-acceleration="40"
      :max-velocity="20"
    />
  </g-entity>
</template>

<script lang="ts">
import { Mesh, MeshBasicMaterial, SphereGeometry, Vector3 } from 'three'
import { defineComponent, PropType, ref } from 'vue'
import { subscribe } from '../utils'
import GEntity from '../core/GEntity'
import GInputReader from '../components/GInputReader'
import GMovement from '../components/GMovement'

export default defineComponent({
  components: {
    GEntity,
    GInputReader,
    GMovement
  },

  props: {
    position: {
      type: Array as PropType<number[]>,
      default: () => ([ 0, 0, 0 ])
    }
  },

  data: () => ({
    currentPosition: [] as number[],
    direction: new Vector3()
  }),

  setup () {
    const mesh = new Mesh(
      new SphereGeometry(2.5),
      new MeshBasicMaterial({ color: 0x00ff00 })
    )

    const movement = ref(GMovement)
    const inputReader = ref(GInputReader)

    return { mesh, subscribe, movement, inputReader }
  },

  created () {
    this.subscribe('update', this.update)
  },

  methods: {
    onAxisChange ({ value }: any) {
      this.movement.move(value)
    },

    update ({ deltaTime }: any) {
      const velocity = this.movement.velocity.clone()

      this.mesh.position.add(
        velocity.multiplyScalar(deltaTime)
      )
    }
  }
})
</script>
