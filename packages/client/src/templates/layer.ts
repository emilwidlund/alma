export const DEFAULT_FRAGMENT_LAYER_CONTEXT = `void main() {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = vUv;

    // Time varying pixel color
    vec3 col = 0.5 + 0.5 * cos(uTime + uv.xyx + vec3(0, 2, 4));

    // Output to screen
    fragColor = vec4(col, 1.0);
}`;

export const DEFAULT_NEW_FRAGMENT_LAYER_CONTEXT = `void main() {
    vec2 uv = vUv;

    // Copy the underlying layer
    fragColor = texture(uPreviousLayer, uv);
}`;
