varying vec3 vNormal;

void main()
{
    // Position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    // Varyings
    vNormal = normalize(normalMatrix * normal);
}