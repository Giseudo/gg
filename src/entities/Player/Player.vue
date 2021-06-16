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
import { Object3D, Vector3, Material } from 'three'
import { defineComponent, PropType, ref } from 'vue'
import { MatcapMaterial } from '../../materials'
import { subscribe } from '../../utils'
import { useResourcesService } from '../../services'
import { GEntity } from '../../core'
import { GInputReader, GMovement } from '../../components'

import playerMatcapTex from './PlayerMatcap.png?url'
import playerModel from './PlayerModel.fbx?url'

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

    const { loadObject, loadTexture } = useResourcesService()

    return {
      ...components,
      model: {} as Object3D,
      material: {} as Material,
      loadTexture,
      loadObject,
      subscribe
    }
  },

  created () {
    this.subscribe('update', this.update)
  },

  async mounted () {
    this.material = new MatcapMaterial({
      mainTex: await this.loadTexture(playerMatcapTex)
    })

    this.model = await this.loadObject(playerModel)

    this.model.traverse((node: any) => {
      if (node.isMesh)
        node.material = this.material
    })

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
