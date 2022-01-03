/*
 3x3 median filter, adapted from "A Fast, Small-Radius GPU Median Filter" by Morgan McGuire in ShaderX6
 http://graphics.cs.williams.edu/papers/MedianShaderX6/
 
 Morgan McGuire and Kyle Whitson
 Williams College
 
 Register allocation tips by Victor Huang Xiaohuang
 University of Illinois at Urbana-Champaign
 
 http://graphics.cs.williams.edu
 
 
 Copyright (c) Morgan McGuire and Williams College, 2006
 All rights reserved.
 
 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are
 met:
 
 Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.
 
 Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.
 
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { P5BlockFilter } from './p5BlockFilter';

export class P5MedianFilter extends P5BlockFilter {
  constructor() {
    super();

    this.fragmentShader = `
    #ifdef GL_ES
    precision highp float;
    #endif

    uniform sampler2D textureID;
    
    varying vec2 vTexCoord;
    varying vec2 leftTextureCoordinate;
    varying vec2 rightTextureCoordinate;
    
    varying vec2 topTextureCoordinate;
    varying vec2 topLeftTextureCoordinate;
    varying vec2 topRightTextureCoordinate;
    
    varying vec2 bottomTextureCoordinate;
    varying vec2 bottomLeftTextureCoordinate;
    varying vec2 bottomRightTextureCoordinate;

    
    
    #define s2(a, b)				temp = a; a = min(a, b); b = max(temp, b);
    #define mn3(a, b, c)			s2(a, b); s2(a, c);
    #define mx3(a, b, c)			s2(b, c); s2(a, c);
    
    #define mnmx3(a, b, c)			mx3(a, b, c); s2(a, b);                                   // 3 exchanges
    #define mnmx4(a, b, c, d)		s2(a, b); s2(c, d); s2(a, c); s2(b, d);                   // 4 exchanges
    #define mnmx5(a, b, c, d, e)	s2(a, b); s2(c, d); mn3(a, c, e); mx3(b, d, e);           // 6 exchanges
    #define mnmx6(a, b, c, d, e, f) s2(a, d); s2(b, e); s2(c, f); mn3(a, b, c); mx3(d, e, f); // 7 exchanges
  
    void main()
    {
      highp vec3 v[6];

      highp vec3 bottomColor = texture2D(textureID, bottomTextureCoordinate).rgb;
      highp vec3 bottomLeftColor = texture2D(textureID, bottomLeftTextureCoordinate).rgb;
      highp vec3 bottomRightColor = texture2D(textureID, bottomRightTextureCoordinate).rgb;
      highp vec4 centerColor = texture2D(textureID, vTexCoord);
      highp vec3 leftColor = texture2D(textureID, leftTextureCoordinate).rgb;
      highp vec3 rightColor = texture2D(textureID, rightTextureCoordinate).rgb;
      highp vec3 topColor = texture2D(textureID, topTextureCoordinate).rgb;
      highp vec3 topRightColor = texture2D(textureID, topRightTextureCoordinate).rgb;
      highp vec3 topLeftColor = texture2D(textureID, topLeftTextureCoordinate).rgb;

      v[0] = bottomLeftColor;
      v[1] = topRightColor;
      v[2] = topLeftColor;
      v[3] = bottomRightColor;
      v[4] = leftColor;
      v[5] = rightColor;


      vec3 temp;
  
      mnmx6(v[0], v[1], v[2], v[3], v[4], v[5]);
      
      v[5] = bottomColor;
                  
      mnmx5(v[1], v[2], v[3], v[4], v[5]);
                  
      v[5] = topColor;
                                
      mnmx4(v[2], v[3], v[4], v[5]);
                                
      v[5] = centerColor.rgb;
                                            
      mnmx3(v[3], v[4], v[5]);
    
      gl_FragColor = vec4(v[4], centerColor.a);
    }
    `;  
  }
}

