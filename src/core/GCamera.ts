import { defineComponent } from "vue"
import { PerspectiveCamera } from "three"
import { injectStrict } from "../utils"
import * as types from "../types"

export default defineComponent({
  name: 'GCamera',

  props: {
    type: {
      type: String,
      default: 'perspective'
    },

    fieldOfView: {
      type: Number,
      default: 45
    },

    near: {
      type: Number,
      default: .1
    },

    far: {
      type: Number,
      default: 1000
    }
  },

  setup (props) {
    const camera = new PerspectiveCamera(
      props.fieldOfView,
      window.innerWidth / window.innerHeight,
      props.near,
      props.far
    )
    const setCamera = injectStrict(types.SET_CAMERA)

    setCamera(camera)

    return { camera }
  },

  render () { }
})
