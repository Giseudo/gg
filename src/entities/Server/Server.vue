<template>
  <g-entity v-if="!isLoading" :object="model">
    <g-nav-mesh />
  </g-entity>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Material, Object3D } from 'three'
import { GEntity } from '../../core'
import { GNavMesh } from '../../components'
import { useResourcesService } from '../../services'
import { MatcapMaterial } from '../../materials'
// import ServerNavMesh from './ServerNavMesh.glb?url'

import serverMatcapTex from './ServerMatcap.png?url'
import serverModel from './ServerModel.fbx?url'

export default defineComponent({
  name: 'Server',

  components: {
    GEntity,
    GNavMesh
  },

  setup () {
    const { loadObject, loadTexture } = useResourcesService()

    return {
      model: {} as Object3D,
      material: {} as Material,
      loadObject,
      loadTexture
    }
  },

  data: () => ({
    isLoading: true
  }),

  async mounted () {
    this.model = await this.loadObject(serverModel)

    this.material = new MatcapMaterial({
      mainTex: await this.loadTexture(serverMatcapTex)
    })

    this.model.traverse((node: any) => {
      if (node.isMesh)
        node.material = this.material
    })

    this.isLoading = false
  }
})
</script>
