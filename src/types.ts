import { Camera, EventDispatcher, Object3D } from 'three'
import { InjectionKey } from 'vue'
import { InputService, ResourcesService } from './services'

export const GET_CAMERA: InjectionKey<Camera> = Symbol('Gets the main camera')
export const SET_CAMERA: InjectionKey<Function> = Symbol('Sets the camera')
export const ADD_OBJECT: InjectionKey<Function> = Symbol('Adds object to scene')
export const REMOVE_OBJECT: InjectionKey<Function> = Symbol('Removes object from scene')
export const GET_MESSENGER: InjectionKey<EventDispatcher> = Symbol('The message bus')
export const GET_OBJECT: InjectionKey<Object3D> = Symbol('The current context game object')
export const SET_OBJECT: InjectionKey<Function> = Symbol('Sets the current context entity')

// Services
export const INPUT_SERVICE: InjectionKey<InputService> = Symbol('The input service')
export const RESOURCES_SERVICE: InjectionKey<ResourcesService> = Symbol('The resources service')
