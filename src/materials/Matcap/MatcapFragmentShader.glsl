uniform vec3 uColor;
uniform sampler2D uMainTex;
uniform int uPass;
varying vec2 vN;

float frac(float v) { return v - floor(v); }

void main() {
  if (uPass > 0) return;

  vec4 matcapTex = texture2D(uMainTex, vN);
  vec3 color = matcapTex.rgb * uColor;

  gl_FragColor = vec4(color, 1.0);
}
