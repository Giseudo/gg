<template>
  <g-entity
    v-if="!isLoading"
    :object="model"
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
import { Object3D, Vector3 } from 'three'
import { defineComponent, PropType, ref, markRaw } from 'vue'
import { injectStrict, subscribe } from '../../utils'
import GEntity from '../../core/GEntity'
import GInputReader from '../../components/GInputReader'
import GMovement from '../../components/GMovement'
import playerTexture from './PlayerMatcap.png'
import playerModel from './PlayerModel.fbx?url'
import * as types from '../../types'

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
    isLoading: true,
    currentPosition: [] as number[],
    direction: new Vector3(),
  }),

  setup () {
    const components = {
      movement: ref(GMovement),
      inputReader: ref(GInputReader)
    }

    const services = {
      resources: injectStrict(types.RESOURCES_SERVICE)
    }

    return {
      ...components,
      ...services,
      model: {} as Object3D,
      subscribe
    }
  },

  created () {
    this.subscribe('update', this.update)
  },

  async mounted () {
    // const texture = await this.resources.loadTexture(playerTexture)
    this.model = await this.resources.loadObject(playerModel)

    this.isLoading = false
  },

  methods: {
    onAxisChange ({ value }: any) {
      this.movement.move(value)
    },

    update ({ deltaTime }: any) {
      const velocity = this.movement.velocity.clone()

      this.model.position.add(
        velocity.multiplyScalar(deltaTime)
      )
    }
  }
})
</script>
