import { provide } from 'vue'
import { InputService } from './Input'
import * as types from '../types'

export function provideServices () {
  provide(types.INPUT_SERVICE, new InputService())
}
