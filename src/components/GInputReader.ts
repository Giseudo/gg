import { Vector2, Vector3 } from "three"
import { defineComponent, inject } from "vue"
import { GET_CAMERA, INPUT_SERVICE } from "../types"
import { injectStrict } from "../utils"

export const PRIMARY_AXIS = 'input/PRIMARY_AXIS'
export const SECONDARY_AXIS = 'input/SECONDARY_AXIS'
export const UP_BUTTON = 'input/UP_BUTTON'
export const RIGHT_BUTTON = 'input/RIGHT_BUTTON'
export const DOWN_BUTTON = 'input/DOWN_BUTTON'
export const LEFT_BUTTON = 'input/LEFT_BUTTON'
export const CONFIRM_BUTTON = 'input/CONFIRM_BUTTON'
export const CANCEL_BUTTON = 'input/CANCEL_BUTTON'

export default defineComponent({
  name: 'GInputReader',

  setup () {
    const state = {
      axes: {
        [PRIMARY_AXIS]: {
          value: new Vector2(),
          vertical: {
            positive: [UP_BUTTON],
            negative: [DOWN_BUTTON],
          },
          horizontal: {
            positive: [RIGHT_BUTTON],
            negative: [LEFT_BUTTON],
          }
        }
      } as any,

      buttons: {
        [UP_BUTTON]: ['w', 'W', 'ArrowUp'],
        [DOWN_BUTTON]: ['s', 'S', 'ArrowDown'],
        [LEFT_BUTTON]: ['a', 'A', 'ArrowLeft'],
        [RIGHT_BUTTON]: ['d', 'D', 'ArrowRight'],
        [CONFIRM_BUTTON]: ['space'],
        [CANCEL_BUTTON]: ['esc']
      } as any
    }

    const inputService = inject(INPUT_SERVICE)
    const camera = injectStrict(GET_CAMERA)

    return { state, camera, inputService }
  },

  data: () => ({
    pressing: [] as string[]
  }),

  mounted () {
    // TODO: Move this to a service
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
  },

  methods: {
    onKeyDown (event: KeyboardEvent) {
      if (event.repeat) return

      const { key } = event

      for (const button in this.state.buttons) {
        const buttonKeys = this.state.buttons[button]

        if (!buttonKeys.includes(key)) continue

        if (!this.isPressing(button)) this.pressing.push(button)

        if ([ UP_BUTTON, RIGHT_BUTTON, DOWN_BUTTON, LEFT_BUTTON ].includes(button))
          this.changeAxis(button)
      }
    },

    onKeyUp (event: KeyboardEvent) {
      if (event.repeat) return

      const { key } = event

      for (const button in this.state.buttons) {
        const keys = this.state.buttons[button]
        const index = this.pressing.indexOf(button)

        if (!keys.includes(key)) continue
        if (index < 0) continue

        this.pressing.splice(index, 1)

        if ([UP_BUTTON, RIGHT_BUTTON, DOWN_BUTTON, LEFT_BUTTON].includes(button))
          this.changeAxis(button)
      }
    },

    changeAxis (button: string) {
      for (const topic in this.state.axes) {
        const axis = this.state.axes[topic]

        if (axis.vertical.positive.includes(button))
          axis.value.y = this.isPressing(button) ? 1 : 0
        if (axis.vertical.negative.includes(button))
          axis.value.y = this.isPressing(button) ? -1 : 0
        if (axis.horizontal.positive.includes(button))
          axis.value.x = this.isPressing(button) ? 1 : 0
        if (axis.horizontal.negative.includes(button))
          axis.value.x = this.isPressing(button) ? -1 : 0

        this.$emit('primary-axis', {
          value: this.getOrientedAxis(topic)
        })
      }
    },

    isPressing (button: string): boolean {
      return this.pressing.includes(button)
    },

    getAxis (name: string): Vector3 {
      const direction = this.state.axes[name].value

      return direction
    },

    getOrientedAxis (name: string): Vector3 {
      const direction = this.getAxis(name)

      if (!this.camera) return direction

      const right = new Vector3(1, 0, 0)
      .applyQuaternion(this.camera.quaternion)

      right.y = 0
      right.normalize()

      const forward = new Vector3(0, 0, -1)
      .applyQuaternion(this.camera.quaternion)

      forward.y = 0
      forward.normalize()

      return right.multiplyScalar(direction.x)
      .add(forward.multiplyScalar(direction.y))
    }
  },

  render () { }
})
