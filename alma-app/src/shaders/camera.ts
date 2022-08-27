import glslify from 'glslify';

export const VERTEX = glslify(`#version 300 es
precision highp float;

uniform vec2 resolution;

in vec2 position;
out vec2 fragCoord;

void main() {
    fragCoord = position * vec2(0.5) + vec2(0.5);
    fragCoord *= vec2(-1., -1.);
    fragCoord = fragCoord * resolution;
    gl_Position = vec4(position, 0, 1);
}`);

export const FRAGMENT = glslify(`#version 300 es
precision highp float;

uniform sampler2D cameraTexture;
uniform vec2 cameraTextureResolution;
uniform vec2 resolution;

in vec2 fragCoord;
out vec4 fragColor;

void main() {
	float textureAspect = cameraTextureResolution.x / cameraTextureResolution.y;
	float frameAspect = resolution.x / resolution.y;
	float textureFrameRatio = textureAspect / frameAspect;
	vec2 scale = vec2(1.0, 1.0);

	if (frameAspect < 1.0) {
		// scale.x = 1.0 / textureFrameRatio;
		scale.y = textureFrameRatio;
	} else {
		// scale.y = textureFrameRatio;
		scale.x = 1.0 / textureFrameRatio;
	}

	vec2 uv = fragCoord / resolution;
	uv = uv * scale;
	uv.y += (textureFrameRatio - 1.0) / 2.0;

    fragColor = vec4(texture(cameraTexture, uv).rgb, 1.0);
}`);

export const KALEIDOSCOPE = glslify(`#version 300 es
precision highp float;

uniform sampler2D cameraTexture;
uniform vec2 cameraTextureResolution;
uniform vec2 resolution;
uniform float time;

in vec2 fragCoord;
out vec4 fragColor;

vec2 kaleido(vec2 uv) {
	float th = atan(uv.y, uv.x);
	float r = pow(length(uv), .9);
	float f = 3.14159 / 3.5;

	th = abs(mod(th + f/4.0, f) - f/2.0) / (1.0 + r);

	return vec2(cos(th), sin(th)) * r * .1;
}

vec2 transform(vec2 at) {
	vec2 v;
	float th = .02 * time;
	v.x = at.x * cos(th) - at.y * sin(th) - .2 * sin(th);
	v.y = at.x * sin(th) + at.y * cos(th) + .2 * cos(th);
	return v;
}

vec4 scene(vec2 at) {
	float x = mod(time / 8.0, 3.0);
	return texture(cameraTexture, transform(at) * 10.0);
}

void main() {
	float textureAspect = cameraTextureResolution.x / cameraTextureResolution.y;
	float frameAspect = resolution.x / resolution.y;
	float textureFrameRatio = textureAspect / frameAspect;
	vec2 scale = vec2(1.0, 1.0);

	if (frameAspect < 1.0) {
		// scale.x = 1.0 / textureFrameRatio;
		scale.y = textureFrameRatio;
	} else {
		// scale.y = textureFrameRatio;
		scale.x = 1.0 / textureFrameRatio;
	}

	vec2 uv = fragCoord / resolution;
	uv *= scale;
	uv.y += (textureFrameRatio - 1.0) / 2.0;

	uv += 1.0;
    uv.x = mix(-1.0, 1.0, uv.x);
	uv.y = mix(-1.0, 1.0, uv.y);
	uv.y *= resolution.y / resolution.x;
    fragColor = scene(kaleido(uv));
}
`);

export const INVERT = glslify(`#version 300 es
precision highp float;

uniform sampler2D cameraTexture;
uniform vec2 cameraTextureResolution;
uniform vec2 resolution;

in vec2 fragCoord;
out vec4 fragColor;

void main() {
	float textureAspect = cameraTextureResolution.x / cameraTextureResolution.y;
	float frameAspect = resolution.x / resolution.y;
	float textureFrameRatio = textureAspect / frameAspect;
	vec2 scale = vec2(1.0, 1.0);

	if (frameAspect < 1.0) {
		// scale.x = 1.0 / textureFrameRatio;
		scale.y = textureFrameRatio;
	} else {
		// scale.y = textureFrameRatio;
		scale.x = 1.0 / textureFrameRatio;
	}

	vec2 uv = fragCoord / resolution;
	uv = uv * scale;
	uv.y += (textureFrameRatio - 1.0) / 2.0;

    fragColor = vec4(1.0 - texture(cameraTexture, uv).rgb, 1.0);
}`);
