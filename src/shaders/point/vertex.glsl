uniform vec2 uResolution;
uniform float uSize;

varying vec2 vUv;

void main()
{
    // Final position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;
    gl_PointSize = uSize * ( 300.0 / -viewPosition.z );

    // Varyings
    vUv = uv;
}