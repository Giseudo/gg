<template>
  <div class="g-viewport">
    <slot />
  </div>
</template>

<script lang="ts">
import { Camera, Scene, EventDispatcher, WebGLRenderer, Object3D, Color, Clock } from 'three'
import { defineComponent, provide, ref, Ref } from 'vue'
import * as types from '../types'

type RendererState = {
  camera: Ref<Camera>,
  scene: Scene,
  renderer: WebGLRenderer,
  messenger: EventDispatcher,
  clock: Clock
}

const TIME_INTERVAL = 1 / 60

export default defineComponent({
  name: 'GViewport',

  props: {
    color: {
      type: [ String, Number ],
      default: 0x000000
    },
  },

  setup () {
    const state: RendererState = {
      camera: ref(new Camera()),
      scene: new Scene(),
      renderer: new WebGLRenderer(),
      messenger: new EventDispatcher(),
      clock: new Clock()
    }

    const setCamera = (camera: Camera) => state.camera.value = camera
    const addObject = (object: Object3D) => state.scene.add(object)
    const removeObject = (object: Object3D) => state.scene.remove(object)

    provide(types.GET_MESSENGER, state.messenger)
    provide(types.GET_CAMERA, state.camera.value)
    provide(types.SET_CAMERA, setCamera)
    provide(types.ADD_OBJECT, addObject)
    provide(types.REMOVE_OBJECT, removeObject)

    return {
      state,
      renderer: state.renderer
    }
  },

  data: () => ({
    time: 0,
    deltaTime: 0
  }),

  mounted () {
    this.init()
  },

  beforeUnmount() {
    this.renderer.setAnimationLoop(null)
  },

  watch: {
    color (value) {
      this.renderer.setClearColor(value)
    }
  },

  methods: {
    init () {
      const canvas: HTMLCanvasElement = this.renderer.domElement

      this.renderer.setSize(this.$el.clientWidth, this.$el.clientHeight)
      this.renderer.setClearColor(new Color(this.color))
      this.renderer.setAnimationLoop(this.animate)

      this.$el.appendChild(canvas)
      this.$emit('loaded')
    },

    animate () {
      if (!this.state.camera) return

      this.deltaTime += this.state.clock.getDelta()
      this.time += this.deltaTime

      if (this.deltaTime > TIME_INTERVAL) {
        this.state.renderer.render(this.state.scene, this.state.camera.value)

        this.state.messenger.dispatchEvent({
          type: 'update',
          deltaTime: this.deltaTime,
          time: this.time
        })

        this.deltaTime %= TIME_INTERVAL
      }
    }
  }
})
</script>

<style>
.g-viewport {
  position: relative;
}

.g-viewport > canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
