import { defineComponent } from "vue"
import { useNavMeshService } from "../services"

export default defineComponent({
  name: 'GNavMesh',

  setup () {
    const { loadNavMesh } = useNavMeshService()

    return { loadNavMesh }
  },

  mounted () {
    this.loadNavMesh()
  },

  render () {}
})
