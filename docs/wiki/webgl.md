# WebGL

## WebGL2

> GPU에서 실행되는 코드를 제공해만 합니다. 그 코드는 두 개 함수 쌍 형태로 제공되어야 하고, 각각의 함수는 정점 셰이더(vertex shader)와 프래그먼트 셰이더(fragment shader)라고 불립니다. 각각은 매우 엄격한 타입(strictly-types)을 가지는 C/C++과 유사한 GLSL(GL Shader Language)로 작성되어야 합니다. 

WebGL2는 두 가지 언어로 개발한다.

canvas와 context를 통해 WebGL2 API와 커뮤니케이션하는 Javascript 코드와:
```javascript
const canvas = document.querySelector("canvas")
const gl = canvas.getContext("webgl2")
```

GLSL이라는 언어로 셰이더와 프라그먼트를 작성하는 코드로 이루어진다:
```glsl
##version 300 es

precision highp float;

uniform vec4 u_color;

out vec4 outColor;

void main() {
  outColor = u_color;
}
```

GLSL 코드는 JS 코드에서 template string을 통해 작성하거나 <script> 태그를 통해 작성할 수 있다:

```javascript
const vertexShaderSource = `#version 300 es

in vec2 a_position;

uniform vec2 u_resolution;

void main() {
  vec2 zeroToOne = a_position / u_resolution;
  vec2 zeroToTwo = zeroToOne * 2.0;
  vec2 clipSpace = zeroToTwo - 1.0;

  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}
`
```

## 셰이더(Shader)

> WebGL은 단순한 래스터화(rasterization) 엔진일 뿐입니다. WebGL은 여러분이 작성한 코드로 점, 선 및 삼각형들을 그릴 뿐입니다.

> WebGL에서는 무언가를 그릴때 마다 두개의 셰이더가 필요합니다. 정점 셰이더와 프래그먼트 셰이더입니다.

> 프래그먼트 셰이더의 역할은 현재 래스터화 되는 픽셀에 색상을 할당하는 것입니다.

> 프래그먼트 셰이더는 픽셀당 한번씩 호출 됩니다. 호출 될 때마다 여러분이 지정한 out 변수를 어떤 색상으로 설정해야 합니다.

셰이더는 정점 셰이더와 프래그먼트 셰이더 두 가지가 있다.

정점 셰이더는 공간 좌표를 설정하고, 프래그먼트 셰이더는 픽셀에 색상을 할당한다.

위에서 말하는 **래스터화** 의미는 정점 셰이더에 공간을 설정하면 그 공간을 채우는 픽셀을 프래그먼트 셰이더가 채운다는 의미이다.

여기서 2D API와의 성능 차이가 나오는 것이 아닐까?\
[Why WebGL is faster than Canvas?](https://stackoverflow.com/questions/28867297/why-webgl-is-faster-than-canvas)

## References

WebGL2 기초:\
https://webgl2fundamentals.org/webgl/lessons/ko/
