import { provide } from 'vue'
import { InputService } from './Input'
import { ResourcesService } from './Resources'
import * as types from '../types'

export function provideServices () {
  provide(types.INPUT_SERVICE, new InputService())
  provide(types.RESOURCES_SERVICE, new ResourcesService())
}
