# P5-Image

P5-Image is a javascript library build on top of p5.js and webGL. It was inspired by the project of GPUImage [GPUImage project](https://github.com/BradLarson/GPUImage) by Brad Larson which provides a suite of image processing functionalities on iOS platform. It implements the complex image processing algorithms using openGL shading language (GLSL), so the power of GPU can be leveraged to process all image pixels in parallel. 

P5-Image project ports all the openGL shaders from GPUImage to the javascript framework. It uses p5.js to manage the webGL canvas, and feeds the shaders to p5.js for rendering. The goal of the project is to provide web developers an easy-to-use library to process images right in the web pages using out of box algorithms, it is also easy to add additional algorithms using custom shaders.

## How does it work

P5-Image uses GPU to process images, hence, has much faster speed and performance than CPU. With the support of webgl, the image processing algorithms are coded as openGL GLSL code, abstracted as filters to the image sources. The framework reads the images from input image url, apply filters as openGL shaders before drawing to the canvas. Then, the canvas is appended to a parent node in the HTML DOM, so it can be displayed in the web page. 

The framework supports filter chain, which an list of filters can be added, and each one in the list will be applied one after another. 

The framework also supports blend mode which takes two images as inputs and blends them together.

## Filters
### Color adjustment
- BrightnessFilter
  - brightness: The adjusted brightness (-1.0 to 1.0, default 0.2)
- ExposureFilter
  - exposure: The adjusted exposure (-10.0 to 10.0, default 1.0)
- ContrastFilter: Adjusts the contrast of the image
  - contrast: The adjusted contrast (0.0 to 4.0, default 2.0) 
- SaturationFilter: Adjusts the saturation of an image
  - saturation: The degree of saturation or desaturation to apply to the image (0.0 - 2.0, with 1.5 as the default)
- GammaFilter: Adjusts the gamma of an image
  - gamma: The gamma adjustment to apply (0.0 - 3.0, with 2.0 as the default)
- LevelsFilter: levels adjustment. 
  - The min, max, minOut and maxOut parameters are floats in the range [0, 1]. 
- ColorMatrixFilter: Transforms the colors of an image by applying a matrix to them
  - colorMatrix: A 4x4 matrix used to transform each color in an image
  - intensity: The degree to which the new transformed color replaces the original color for each pixel
- RGBFilter: Adjusts the individual RGB channels of an image
  - red, green, blue: Normalized values by which each color channel is multiplied. The range is from 0.0 up, with 1.0 as the default.
- HueFilter: Adjusts the hue of an image
  - hue: The hue angle, in degrees. 90 degrees by default
- TintFilter: Adjusts the Tint of an image.
  - tint: The tint to adjust the image by. A value of -200 is very green and 200 is very pink. The default value is 0.
- TemperatureFilter: Adjusts the Temperature of an image.
  - temperature: The temperature to adjust the image by, in ºK. A value of 4000 is very cool and 7000 very warm. The default value is 5000. Note that the scale between 4000 and 5000 is nearly as visually significant as that between 5000 and 7000.  
- HighlightsAndShadowsFilter: Adjusts the shadows and highlights of an image
  - shadows: Increase to lighten shadows, from 0.0 to 1.0, with 0.0 as the default.
  - highlights: Decrease to darken highlights, from 1.0 to 0.0, with 1.0 as the default.
- ColorInversionFilter: Inverts the colors of an image
- MonochromeFilter: Converts the image to a single-color version, based on the luminance of each pixel
  - intensity: The degree to which the specific color replaces the normal image color (0.0 - 1.0, with 1.0 as the default)
  - color: The color to use as the basis for the effect, with (0.6, 0.45, 0.3) as the default.
- FalseColorFilter: Uses the luminance of the image to mix between two user-specified colors
  - firstColor, secondColor: The first and second colors specify what colors replace the dark and light areas of the image, respectively. The defaults are (0.0, 0.0, 0.5) and (1.0, 0.0, 0.0).
- HazeFilter: Used to add or remove haze (similar to a UV filter)
  - distance: Strength of the color applied. Default 0. Values between -.3 and .3 are best.
  - slope: Amount of color change. Default 0. Values between -.3 and .3 are best.
- SepiaToneFilter: Simple sepia tone filter
  - intensity: The degree to which the sepia tone replaces the normal image color (0.0 - 1.0, with 1.0 as the default)
- OpacityFilter: Adjusts the alpha channel of the incoming image
  - opacity: The value to multiply the incoming alpha channel for each pixel by (0.0 - 1.0, with 1.0 as the default)
- LuminanceThresholdFilter: Pixels with a luminance above the threshold will appear white, and those below will be black
  - threshold: The luminance threshold, from 0.0 to 1.0, with a default of 0.5
- ChromaKeyingFilter: For a given color in the image, sets the alpha channel to 0. This is similar to the ChromaKeyBlend, only instead of blending in a second image for a matching color this doesn't take in a second image and just turns a given color transparent.
  - thresholdSensitivity: How close a color match needs to exist to the target color to be replaced (default of 0.1)
  - smoothing: How smoothly to blend for the color match (default of 0.05)
  - colorToReplace: the color to compare to. default is set to [0.2, 0.2, 0.2]
- VibranceFilter: Adjusts the vibrance of an image
  - vibrance: The vibrance adjustment to apply, using 1.0 as the default, and a suggested min/max of around -1.2 and 1.2, respectively.
- HighlightShadowTintFilter: Allows you to tint the shadows and highlights of an image independently using a color and intensity
  - shadowTintColor: Shadow tint RGB color (GPUVector4). Default: [1.0f, 0.0f, 0.0f] (red).
  - highlightTintColor: Highlight tint RGB color (GPUVector4). Default: [0.0f, 0.0f, 1.0f] (blue).
  - shadowTintIntensity: Shadow tint intensity, from 0.0 to 1.0. Default: 0.0
  - highlightTintIntensity: Highlight tint intensity, from 0.0 to 1.0, with 0.0 as the default.


### Image processing

- CropFilter: This crops an image to a specific region, then passes only that region on to the next stage in the filter
  - cropSizeInPixels: The pixel dimensions of the area to be cropped out of the image.
  - locationOfCropInPixels: The upper-left corner of the crop area. If not specified, the crop will be centered in the image.
- LanczosResamplingFilter: This lets you up- or downsample an image using Lanczos resampling, which results in noticeably better quality than the standard linear or trilinear interpolation. 
  - overriddenOutputSize: set the target output resolution for the filter, and the image will be resampled for that new size.
- SharpenFilter: Sharpens the image
  - sharpness: The sharpness adjustment to apply (-4.0 - 4.0, with 0.0 as the default)
- AverageColorFilter: calculate the average colors from (top-left, top-right, bottom-left, bottom-right) pixels, and set it to the current position.
- EmbossFilter: Applies an embossing effect on the image
  - intensity: The strength of the embossing, from 0.0 to 4.0, with 1.0 as the normal level
- GrayScaleFilter: Turn the image into a gray scale image
- MedianFilter: Takes the median value of the three color components, over a 3x3 area
- SobelEdgeFilter: Sobel edge detection, with edges highlighted in white
  - edgeStrength: Adjusts the dynamic range of the filter. Higher values lead to stronger edges, but can saturate the intensity colorspace. Default is 1.0.
- BoxblurFilter: variable-radius box blur
  - radius: A radius in pixels to use for the blur, with a default of 2.0. This adjusts the box radius for the blur function.
- GaussianblurFilter: variable-radius gaussian blur
  - radius: A radius in pixels to use for the blur, with a default of 2.0. This adjusts the box radius for the blur function.
  - sigma: a value to the sigma variable in the Gaussian distribution function to generate the Gaussian kernel, with default value of 3.0
- AdaptiveThresholdFilter: Determines the local luminance around a pixel, then turns the pixel black if it is below that local luminance and white if above. This can be useful for picking out text under varying lighting conditions.
  - blurRadiusInPixels: A multiplier for the background averaging blur radius in pixels, with a default of 4.
- BlockblurFilter: variable-radius block blur
  - radius: A radius in pixels to use for the blur, with a default of 2.0. This adjusts the block size for the blur function.
- BilateralBlurFilter: A bilateral blur, which tries to blur similar color values while preserving sharp edges
  - distanceNormalizationFactor: A normalization factor for the distance between central color and sample color, with a default of 8.0.
- TiltShiftFilter: A simulated tilt shift lens effect
  - blurRadiusInPixels: The radius of the underlying blur, in pixels. This is 7.0 by default.
  - topFocusLevel: The normalized location of the top of the in-focus area in the image, this value should be lower than bottomFocusLevel, default 0.4
  - bottomFocusLevel: The normalized location of the bottom of the in-focus area in the image, this value should be higher than topFocusLevel, default 0.6
  - focusFallOffRate: The rate at which the image gets blurry away from the in-focus region, default 0.2
- PrewittEdgeDetectionFilter: Prewitt edge detection, with edges highlighted in white
  - edgeStrength: Adjusts the dynamic range of the filter. Higher values lead to stronger edges, but can saturate the intensity colorspace. Default is 1.0.
- CannyEdgeDetectionFilter: This uses the full Canny process to highlight one-pixel-wide edges
  - blurRadiusInPixels: The underlying blur radius for the Gaussian blur. Default is 2.0.
  - upperThreshold: Any edge with a gradient magnitude above this threshold will pass and show up in the final result. Default is 0.4.
  - lowerThreshold: Any edge with a gradient magnitude below this threshold will fail and be removed from the final result. Default is 0.1.
- HarrisCornerDetectorFilter: Runs the Harris corner detection algorithm on an input image, and produces an image with those corner points as white pixels and everything else black. The cornersDetectedCallback can be set, and you will be provided with an array of corners (in normalized 0..1 Positions) within that callback for whatever additional operations you want to perform.
  - blurRadiusInPixels: The radius of the underlying Gaussian blur. The default is 2.0.
  - sensitivity: An internal scaling factor applied to adjust the dynamic range of the cornerness maps generated in the filter. The default is 5.0.
  - threshold: The threshold at which a point is detected as a corner. This can vary significantly based on the size, lighting conditions, default is 0.20.
- NobleCornerDetectorFilter: Runs the Noble variant on the Harris corner detector. It behaves as described above for the Harris detector.
  - blurRadiusInPixels: The radius of the underlying Gaussian blur. The default is 2.0.
  - sensitivity: An internal scaling factor applied to adjust the dynamic range of the cornerness maps generated in the filter. The default is 5.0.
  - threshold: The threshold at which a point is detected as a corner. This can vary significantly based on the size, lighting conditions, default is 0.2.
- ShiTomasiCornerDetectorFilter: Runs the Shi-Tomasi feature detector. It behaves as described above for the Harris detector.
  - blurRadiusInPixels: The radius of the underlying Gaussian blur. The default is 2.0.
  - sensitivity: An internal scaling factor applied to adjust the dynamic range of the cornerness maps generated in the filter. The default is 1.5.
  - threshold: The threshold at which a point is detected as a corner. This can vary significantly based on the size, lighting conditions, default is 0.2.
- DilationFilter: This performs an image dilation operation, where the maximum intensity of the color channels in a rectangular neighborhood is used for the intensity of this pixel. The radius of the rectangular area to sample over is specified on initialization, with a range of 1-4 pixels. This is intended for use with grayscale images, and it expands bright regions.
- ErosionFilter: This performs an image erosion operation, where the minimum intensity of the color channels in a rectangular neighborhood is used for the intensity of this pixel. The radius of the rectangular area to sample over is specified on initialization, with a range of 1-4 pixels. This is intended for use with grayscale images, and it expands dark regions.
- OpeningFilter: This performs an erosion on the color channels of an image, followed by a dilation of the same radius. The radius is set on initialization, with a range of 1-4 pixels. This filters out smaller bright regions.
- ClosingFilter: This performs a dilation on the color channels of an image, followed by an erosion of the same radius. The radius is set on initialization, with a range of 1-4 pixels. This filters out smaller dark regions.
- LocalBinaryPatternFilter: This performs a comparison of intensity of the red channel of the 8 surrounding pixels and that of the central one, encoding the comparison results in a bit string that becomes this pixel intensity. The least-significant bit is the top-right comparison, going counterclockwise to end at the right comparison as the most significant bit.
- ColorLocalBinaryPatternFilter: This performs a comparison of intensity of all color channels of the 8 surrounding pixels and that of the central one, encoding the comparison results in a bit string that becomes each color channel's intensity. The least-significant bit is the top-right comparison, going counterclockwise to end at the right comparison as the most significant bit.
- MotionBlurFilter: Applies a directional motion blur to an image
  - blurSize: A multiplier for the blur size, ranging from 0.0 on up, with a default of 1.0
  - blurAngle: The angular direction of the blur, in degrees. 0 degrees by default.
- ZoomBlurFilter: Applies a directional motion blur to an image
  - blurSize: A multiplier for the blur size, ranging from 0.0 on up, with a default of 1.0
  - blurCenter: The normalized center of the blur. (0.5, 0.5) by default
- ColourFASTFeatureDetectionFilter: Brings out the ColourFAST feature descriptors for an image
  - blurRadiusInPixels: The underlying blur radius for the box blur. Default is 3.0.

### Visual effect

- PixellateFilter: Applies a pixellation effect on an image or video
  - fractionalWidthOfAPixel: How large the pixels are, as a fraction of the width and height of the image (0.0 - 1.0, default 0.05)
- PolarPixellateFilter: Applies a pixellation effect on an image or video, based on polar coordinates instead of Cartesian ones
  - center: The center about which to apply the pixellation, defaulting to (0.5, 0.5)
  - pixelSize: The fractional pixel size, split into width and height components. The default is (0.05, 0.05)
- PolkaDotFilter: Breaks an image up into colored dots within a regular grid
  - fractionalWidthOfAPixel: How large the dots are, as a fraction of the width and height of the image (0.0 - 1.0, default 0.05)
  -dotScaling: What fraction of each grid space is taken up by a dot, from 0.0 to 1.0 with a default of 0.9.
- HalftoneFilter: Applies a halftone effect to an image, like news print
  - fractionalWidthOfAPixel: How large the halftone dots are, as a fraction of the width and height of the image (0.0 - 1.0, default 0.05)
- CrosshatchFilter: This converts an image into a black-and-white crosshatch pattern
  - crossHatchSpacing: The fractional width of the image to use as the spacing for the crosshatch. The default is 0.03.
  - lineWidth: A relative width for the crosshatch lines. The default is 0.003.
- SketchFilter: Converts video to look like a sketch. This is just the Sobel edge detection filter with the colors inverted
  - edgeStrength: Adjusts the dynamic range of the filter. Higher values lead to stronger edges, but can saturate the intensity colorspace. Default is 1.0.
- ThresholdSketchFilter: Same as the sketch filter, only the edges are thresholded instead of being grayscale
  - edgeStrength: Adjusts the dynamic range of the filter. Higher values lead to stronger edges, but can saturate the intensity colorspace. Default is 1.0.
  - threshold: Any edge above this threshold will be black, and anything below white. Ranges from 0.0 to 1.0, with 0.8 as the default
- ToonFilter: This uses Sobel edge detection to place a black border around objects, and then it quantizes the colors present in the image to give a cartoon-like quality to the image.
  - threshold: The sensitivity of the edge detection, with lower values being more sensitive. Ranges from 0.0 to 1.0, with 0.2 as the default
  - quantizationLevels: The number of color levels to represent in the final image. Default is 10.0
- SmoothToonFilter: This uses a similar process as the ToonFilter, only it precedes the toon effect with a Gaussian blur to smooth out noise.
  - blurRadiusInPixels: The radius of the underlying Gaussian blur. The default is 2.0.
  - threshold: The sensitivity of the edge detection, with lower values being more sensitive. Ranges from 0.0 to 1.0, with 0.2 as the default
  - quantizationLevels: The number of color levels to represent in the final image. Default is 10.0
- PosterizeFilter: This reduces the color dynamic range into the number of steps specified, leading to a cartoon-like simple shading of the image.
  - colorLevels: The number of color levels to reduce the image space to. This ranges from 1 to 256, with a default of 10.
- SwirlFilter: Creates a swirl distortion on the image
  - radius: The radius from the center to apply the distortion, with a default of 0.5
  - center: The center of the image (in normalized coordinates from 0 - 1.0) about which to twist, with a default of (0.5, 0.5)
  - angle: The amount of twist to apply to the image, with a default of 1.0
- BulgeFilter: Creates a bulge distortion on the image
  - radius: The radius from the center to apply the distortion, with a default of 0.25
  - center: The center of the image (in normalized coordinates from 0 - 1.0) about which to distort, with a default of (0.5, 0.5)
  - scale: The amount of distortion to apply, from -1.0 to 1.0, with a default of 0.5
- PinchFilter: Creates a pinch distortion of the image
  - radius: The radius from the center to apply the distortion, with a default of 1.0
  - center: The center of the image (in normalized coordinates from 0 - 1.0) about which to distort, with a default of (0.5, 0.5)
  - scale: The amount of distortion to apply, from -2.0 to 2.0, with a default of 1.0
- StretchFilter: Creates a stretch distortion of the image
  - center: The center of the image (in normalized coordinates from 0 - 1.0) about which to distort, with a default of (0.5, 0.5)
- SphereRefractionFilter: Simulates the refraction through a glass sphere
  - center: The center about which to apply the distortion, with a default of (0.5, 0.5)
  - radius: The radius of the distortion, ranging from 0.0 to 1.0, with a default of 0.25
  - refractiveIndex: The index of refraction for the sphere, with a default of 0.71
- GlassSphereRefractionFilter: Same as SphereRefraction, only the image is not inverted and there's a little bit of frosting at the edges of the glass
  - center: The center about which to apply the distortion, with a default of (0.5, 0.5)
  - radius: The radius of the distortion, ranging from 0.0 to 1.0, with a default of 0.25
  - refractiveIndex: The index of refraction for the sphere, with a default of 0.71
- VignetteFilter: Performs a vignetting effect, fading out the image at the edges
  - center: The center for the vignette in tex coords (CGPoint), with a default of 0.5, 0.5
  - color: The color to use for the vignette (GPUVector3), with a default of black
  - start: The normalized distance from the center where the vignette effect starts, with a default of 0.5
  - end: The normalized distance from the center where the vignette effect ends, with a default of 0.75
- KuwaharaFilter: Kuwahara image abstraction, drawn from the work of Kyprianidis, et. al. in their publication "Anisotropic Kuwahara Filtering on the GPU" within the GPU Pro collection. This produces an oil-painting-like image, but it is extremely computationally expensive, so it can take seconds to render a frame on an iPad 2. This might be best used for still images.
  - radius: In integer specifying the number of pixels out from the center pixel to test when applying the filter, with a default of 4. A higher value creates a more abstracted image, but at the cost of much greater processing time.
- CGAColorspaceFilter: Simulates the colorspace of a CGA monitor
- SolarizeFilter: Applies a solarization effect
  - threshold: Pixels with a luminance above the threshold will invert their color. Ranges from 0.0 to 1.0, with 0.5 as the default.


## Blenders

- ChromaKeyBlender: Selectively replaces a color in the first image with the second image
  - thresholdSensitivity: How close a color match needs to exist to the target color to be replaced (default of 0.4)
  - smoothing: How smoothly to blend for the color match (default of 0.1)
  - DissolveBlend: Applies a dissolve blend of two images
  - mix: The degree with which the second image overrides the first (0.0 - 1.0, with 0.5 as the default)
- MultiplyBlender: Applies a multiply blend of two images
- AddBlender: Applies an additive blend of two images
- SubtractBlender: Applies a subtractive blend of two images
- DivideBlender: Applies a division blend of two images
- OverlayBlender: Applies an overlay blend of two images
- DarkenBlender: Blends two images by taking the minimum value of each color component between the images
- LightenBlender: Blends two images by taking the maximum value of each color component between the images
- ColorBurnBlender: Applies a color burn blend of two images
- ColorDodgeBlender: Applies a color dodge blend of two images
- ScreenBlender: Applies a screen blend of two images
- ExclusionBlender: Applies an exclusion blend of two images
- DifferenceBlender: Applies a difference blend of two images
- HardLightBlender: Applies a hard light blend of two images
- SoftLightBlender: Applies a soft light blend of two images
- AlphaBlender: Blends the second image over the first, based on the second's alpha channel
  - mix: The degree with which the second image overrides the first (0.0 - 1.0, with 1.0 as the default)
- SourceOverBlender: Applies a source over blend of two images
- NormalBlender: Applies a normal blend of two images
- ColorBlender: Applies a color blend of two images
- HueBlender: Applies a hue blend of two images
- SaturationBlender: Applies a saturation blend of two images
- LuminosityBlender: Applies a luminosity blend of two images
- LinearBurnBlender: Applies a linear burn blend of two images


## Code example
You can use javacript to add the glimg to the webpage dynamically, or leverage an easy to use html custom element tag to include a glimg directly in the page. 

Firstly, incluse the glimg js bundle in you html:
```
  <head>
    <script src="./p5-image.bundle.js" defer></script>
  </head>

```
Then you can use it in javascript file or html pages.

Javascript:
```
const glimg = new GLImage();
glimg.addFilter(new GLImgGrayscaleFilter());
glimg.addFilter(new GLImgSobelEdgeFilter());
glimg.onload = ()=> {
  document.createElement('div').appendChild(glimg.getCanvas());
};
glimg.url = imageUrl;
```

gl-img tag:
```
      <p5-img filters='[
        {"name": "GrayscaleFilter"},
        {"name": "BlockblurFilter", "radius": 10.0}
        ]' src="./lenna.png">
      </p5-img>
```


## Demo
A [demo page](https://weizhou.github.io/glimg/examples/) has been setup to show how to use the libary.

## GLSL tips
- no implicit type conversion, use explicit type conversion functions, such as float(), int() etc.
- no dynamic alloc array. define a MAX_SIZE in the compile time, and use size variable to only access the part needed
- seems no support to varying int, only varying float
- can not for loop on a variable, work around is loop on MAX_COUNT, and break when the count exceed the needed size