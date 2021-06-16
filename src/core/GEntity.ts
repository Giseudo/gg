import { Object3D } from "three"
import { defineComponent, PropType, provide } from "vue"
import { injectStrict } from '../utils'
import * as types from "../types"

export default defineComponent({
  setup (props) {
    const addObject = injectStrict(types.ADD_OBJECT)
    const removeObject = injectStrict(types.REMOVE_OBJECT)

    provide(types.GET_OBJECT, props.object)

    return { addObject, removeObject }
  },

  props: {
    object: {
      type: Object3D,
      required: true
    },

    parent: {
      type: Object3D
    },

    position: {
      type: Array as PropType<number[]>,
      default: () => ([ 0, 0, 0 ])
    }
  },

  watch: {
    position (value) {
      const [ x, y, z ] = value

      this.object.position?.set(x, y, z)
    }
  },

  mounted () {
    const [ x, y, z ] = this.position

    this.object.position?.set(x, y, z)

    if (this.parent) {
      this.parent.add(this.object)
      return
    }

    this.addObject(this.object)
  },

  beforeUnmount () {
    if (this.parent) {
      this.parent.remove(this.object)
      return 
    }

    this.removeObject(this.object)
  },

  render () {
    if (this.$slots.default)
      return this.$slots.default()
  }
})
