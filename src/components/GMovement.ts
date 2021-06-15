import { Vector3 } from 'three'
import { defineComponent } from 'vue'
import { subscribe, injectStrict } from '../utils'

export default defineComponent({
  name: 'GMovement',

  emits: [ 'update:velocity', 'update:direction' ],

  props: {
    maxAcceleration: {
      type: Number,
      default: 5
    },

    maxVelocity: {
      type: Number,
      default: 20
    }
  },

  setup () {
    return { subscribe }
  },

  data: () => ({
    acceleration: new Vector3(),
    velocity: new Vector3(),
    direction: new Vector3()
  }),

  created () {
    this.subscribe('update', this.update)
  },

  methods: {
    move (value: Vector3) {
      this.direction = value
    },

    update ({ deltaTime }: any) {
      const { direction, velocity, maxAcceleration, maxVelocity } = this

      if (direction.lengthSq() > .1)
        velocity.add(
          direction.clone().multiplyScalar(maxAcceleration * deltaTime)
        )
      else if (velocity.lengthSq() > .1)
        velocity.multiplyScalar(1.0 - deltaTime * 3.0)
      else
        velocity.set(0, 0, 0)

      velocity.clampLength(0, maxVelocity)
    }
  },

  render () { }
})
