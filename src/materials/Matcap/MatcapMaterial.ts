import { ref, Ref } from 'vue'
import { Color, ShaderMaterial, Texture } from 'three'
import { MatcapFragmentShader, MatcapVertexShader } from './'

type MatcapMaterialArgs = {
  mainTex: Texture,
  color?: Color | number | string
}

export class MatcapMaterial extends ShaderMaterial {
  public fragmentShader: string = MatcapFragmentShader
  public vertexShader: string = MatcapVertexShader
  private mainTex: Ref<Texture>
  private color: Ref<Color>

  constructor (args: MatcapMaterialArgs) {
    super()

    this.mainTex = ref(args.mainTex)
    this.color = ref(new Color(args.color || 0xffffff))

    this.uniforms = {
      uMainTex: this.mainTex,
      uColor: this.color
    }
  }
}

export default MatcapMaterial
