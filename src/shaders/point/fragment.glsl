uniform sampler2D uTexture;
uniform vec3 uColor;

varying vec2 vUv;

void main()
{
    float diffuse = texture2D( uTexture, vUv ).r;
    float intensity = step(1.0, 1.02 - diffuse);
    
    gl_FragColor = vec4(uColor, intensity);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}