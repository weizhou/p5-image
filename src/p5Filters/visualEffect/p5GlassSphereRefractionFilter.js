import { P5ImgFilter } from "../p5imgFilter";

export class P5GlassSphereRefractionFilter extends P5ImgFilter{
  constructor() {

    super();

    this.fragmentShader = 
     `
      #define MAX_RADIUS 10

      #ifdef GL_ES
      precision mediump float;
      #endif

      uniform sampler2D textureID;
      varying vec2 vTexCoord;

      uniform vec2 center;
      uniform float radius;
      uniform float aspectRatio;
      uniform float refractiveIndex;

      const highp vec3 lightPosition = vec3(-0.5, 0.5, 1.0);
      const highp vec3 ambientLightPosition = vec3(0.0, 0.0, 1.0);
      
      void main()
      {
        highp vec2 textureCoordinateToUse = vec2(vTexCoord.x, (vTexCoord.y * aspectRatio + 0.5 - 0.5 * aspectRatio));
        highp float distanceFromCenter = distance(center, textureCoordinateToUse);
        lowp float checkForPresenceWithinSphere = step(distanceFromCenter, radius);
        
        distanceFromCenter = distanceFromCenter / radius;
        
        float normalizedDepth = radius * sqrt(1.0 - distanceFromCenter * distanceFromCenter);
        vec3 sphereNormal = normalize(vec3(textureCoordinateToUse - center, normalizedDepth));
        
        vec3 refractedVector = 2.0 * refract(vec3(0.0, 0.0, -1.0), sphereNormal, refractiveIndex);
        refractedVector.xy = -refractedVector.xy;
        
        vec3 finalSphereColor = texture2D(textureID, (refractedVector.xy + 1.0) * 0.5).rgb;
        
        // Grazing angle lighting
        highp float lightingIntensity = 2.5 * (1.0 - pow(clamp(dot(ambientLightPosition, sphereNormal), 0.0, 1.0), 0.25));
        finalSphereColor += lightingIntensity;
        
        // Specular lighting
        lightingIntensity  = clamp(dot(normalize(lightPosition), sphereNormal), 0.0, 1.0);
        lightingIntensity  = pow(lightingIntensity, 15.0);
        finalSphereColor += vec3(0.8, 0.8, 0.8) * lightingIntensity;
        
        gl_FragColor = vec4(finalSphereColor, 1.0) * checkForPresenceWithinSphere;
      }
      `;
  }
}
