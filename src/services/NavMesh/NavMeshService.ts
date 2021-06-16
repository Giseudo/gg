import { injectStrict } from "../../utils"
import { ResourcesService } from "../Resources"
import * as types from '../../types'

type NavMeshServicesArgs = {
  resourcesService: ResourcesService
}

class NavMeshService {
  private resources: ResourcesService

  constructor (args: NavMeshServicesArgs) {
    this.resources = args.resourcesService
  }

  loadNavMesh = () => {
    // this.resources.loadObject()
  }
}

export default NavMeshService

export const useNavMeshService = (): NavMeshService =>
  injectStrict(types.NAV_MESH_SERVICE)
