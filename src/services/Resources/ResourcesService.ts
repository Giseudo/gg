import { Object3D, Texture, TextureLoader } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

type Textures = { [name: string]: Texture }
type Models = { [name: string]: Object3D }

class ResourcesService {
  private fbxLoader: FBXLoader = new FBXLoader()
  private textureLoader = new TextureLoader()
  private textures: Textures = {}
  private models: Models = []

  constructor () { }

  public async loadTexture (file: string): Promise<Texture> {
    if (this.textures[file]) return this.textures[file]

    this.textures[file] = await new Promise((resolve, reject) =>
      this.textureLoader.load(
        file,
        texture => resolve(texture),
        () => {},
        err => reject(err)
      )
    )

    return this.textures[file]
  }

  public async loadObject(file: string): Promise<Object3D> {
    if (this.models[file])
      return this.models[file].clone()

    const object: Object3D = await new Promise((resolve, reject) =>
      this.fbxLoader.load(
        file,
        object => resolve(object),
        () => {},
        err => reject(err)
      )
    )

    this.models[file] = object.clone()

    return object
  }
}

export default ResourcesService
