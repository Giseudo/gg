import { provide } from 'vue'
import { InputService } from './Input'
import { ResourcesService } from './Resources'
import { NavMeshService } from './NavMesh'
import * as types from '../types'

export function provideServices () {
  const inputService = new InputService()
  const resourcesService = new ResourcesService()
  const navMeshService = new NavMeshService({ resourcesService })

  provide(types.INPUT_SERVICE, inputService)
  provide(types.RESOURCES_SERVICE, resourcesService)
  provide(types.NAV_MESH_SERVICE, navMeshService)
}
