import { P5ImgFilter } from "../p5imgFilter";

export class P5SphereRefractionFilter extends P5ImgFilter{
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
      
      void main()
      {
          vec2 textureCoordinateToUse = vec2(vTexCoord.x, (-vTexCoord.y * aspectRatio + 0.5 + 0.5 * aspectRatio));
          float distanceFromCenter = distance(center, textureCoordinateToUse);
          float checkForPresenceWithinSphere = step(distanceFromCenter, radius);
          
          distanceFromCenter = distanceFromCenter / radius;
          
          float normalizedDepth = radius * sqrt(1.0 - distanceFromCenter * distanceFromCenter);
          vec3 sphereNormal = normalize(vec3(textureCoordinateToUse - center, normalizedDepth));
          
          vec3 refractedVector = refract(vec3(0.0, 0.0, -1.0), sphereNormal, refractiveIndex);
          refractedVector.x = -refractedVector.x;
          
          gl_FragColor = texture2D(textureID, (refractedVector.xy + 1.0) * 0.5) * checkForPresenceWithinSphere;    
      }
      `;
  }
}
