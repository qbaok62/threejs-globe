varying vec3 vNormal;

void main()
{
    float intensity = pow((0.7 - dot(vNormal, -vec3(0.0, 0.0, 1.0))) * 0.6, 4.0); 

    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0) * intensity;
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}