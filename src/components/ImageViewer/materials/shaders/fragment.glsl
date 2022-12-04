uniform sampler2D uTexture;
uniform vec3 uColor;
uniform vec2 resolution;
uniform vec2 imageResolution;
varying vec2 vUv;
uniform float time;
uniform float blurFactor;
uniform float brightness;
uniform float contrast;
uniform float exposure;
uniform float saturation;
uniform float noise;
uniform int blurRadius;
uniform bool gaussian;

vec4 adjustBrightness(vec4 color, float value) {
    return color + vec4(value);
}

vec4 adjustContrast(vec4 color, float value) {
    return vec4((color.rgb - 0.5) * value + 0.5, color.a);
}

vec4 adjustExposure(vec4 color, float value) {
    return vec4(vec3(1.0 + value) * color.rgb, color.a);
}

vec4 adjustSaturation(vec4 color, float value) {
    vec3 gray = vec3(dot(vec3(0.2125, 0.7154, 0.0721), color.rgb));
    return vec4(mix(gray, color.rgb, value), color.a);
}

vec4 adjustNoise(vec4 color, vec2 uv, float value) {
    // random number between 0 and 1
    float noise = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
    if(noise < value) {
        int random = int(noise * 100.0);
        if(random % 2 == 0) {
            return vec4(0.0, 0.0, 0.0, 1.0);
        } else {
            return vec4(vec3(0.5), 1.0);
        }
    }
    return color;
}

vec4 preProcess(vec4 color, vec2 uv) {
    color = adjustNoise(color, uv, noise);
    return color;
}

vec4 getTextureColor(vec2 uv) {
    vec4 color = texture2D(uTexture, uv);
    return preProcess(color, uv);
}

vec4 blurCurrentPixel(vec2 uv, int blurRadius, float sigma) {
    vec3 sum = vec3(0.0);
    vec2 onePixel = vec2(1.0) / imageResolution;
    float avg = 0.0;

    float sigma_sq = sigma * sigma * 2.0;
    float dividend = (3.1415926 * sigma_sq);

    for(int x = -blurRadius; x <= blurRadius; x++) {
        for(int y = -blurRadius; y <= blurRadius; y++) {
            vec4 color;
            if(gaussian) {
                float weight = exp(-float(x * x + y * y) / sigma_sq) / dividend;
                color = getTextureColor(uv + vec2(x, y) * onePixel * 2.0) * weight;
                avg += weight;
            } else {
                color = getTextureColor(uv + vec2(x, y) * onePixel * sigma);
                avg += 1.0;
            }
            sum += color.rgb;
        }
    }
    return vec4(sum / avg, 1.0);
}

void main() {
    /* Spacial Filters */
    gl_FragColor = blurCurrentPixel(vUv, blurRadius, blurFactor);

    /* Transform Filters */
    gl_FragColor = adjustContrast(gl_FragColor, contrast);
    gl_FragColor = adjustBrightness(gl_FragColor, brightness);
    gl_FragColor = adjustExposure(gl_FragColor, exposure);
    gl_FragColor = adjustSaturation(gl_FragColor, saturation);
}