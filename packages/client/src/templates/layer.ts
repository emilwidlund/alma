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

export const DEFAULT_NEW_CIRCUIT_LAYER_CONTEXT = {
    id: '946cbf0c-555c-4a23-8871-153033dcb299',
    name: 'Untitled',
    nodes: [
        [
            'b6f2b947-2e50-455e-bdf3-e865a583d2ce',
            {
                id: 'b6f2b947-2e50-455e-bdf3-e865a583d2ce',
                name: 'WebGL Context',
                type: 'WEBGL_CONTEXT',
                data: { position: { x: 211, y: 159 } },
                inputs: {
                    color: {
                        id: '31de6cb7-6270-4354-aa20-7f304199d367',
                        name: 'Color',
                        type: 'vec4',
                        defaultValue: {
                            tag: 'lit',
                            type: 'vec4',
                            val: [
                                { tag: 'lit', type: 'float', val: 0 },
                                { tag: 'lit', type: 'float', val: 0 },
                                { tag: 'lit', type: 'float', val: 0 },
                                { tag: 'lit', type: 'float', val: 1 }
                            ]
                        }
                    }
                },
                outputs: {}
            }
        ],
        [
            '9bdc0741-eb8b-4d2b-baec-90816d106feb',
            {
                id: '9bdc0741-eb8b-4d2b-baec-90816d106feb',
                name: 'UV',
                type: 'UV',
                data: { position: { x: -802, y: 240 } },
                inputs: {},
                outputs: {
                    aspectCorrected: {
                        id: '4eddd22e-f245-4b7a-b447-651b2f913876',
                        name: 'Aspect Corrected',
                        type: 'vec2'
                    },
                    uv: { id: '75478c57-926d-47ea-8713-d1ddeab4a4f2', name: 'UV', type: 'vec2' },
                    fragCoord: { id: 'aab11ca5-c503-499e-9f9e-8dd70c32940c', name: 'Frag Coord', type: 'vec4' }
                }
            }
        ],
        [
            '6ce61422-ae36-4b50-a727-6f845b434636',
            {
                id: '6ce61422-ae36-4b50-a727-6f845b434636',
                name: 'Vector 4',
                type: 'VECTOR_4',
                data: { position: { x: -168, y: 143 } },
                inputs: {
                    x: {
                        id: 'ce885d60-add2-4e1a-b214-774c4520e8b6',
                        name: 'X',
                        type: 'float',
                        defaultValue: { tag: 'lit', type: 'float', val: 0 }
                    },
                    y: {
                        id: 'e5c6a901-d9a1-4c42-8a77-f4c220f6db74',
                        name: 'Y',
                        type: 'float',
                        defaultValue: { tag: 'lit', type: 'float', val: 0 }
                    },
                    z: {
                        id: '9d2e0fe6-7f9c-46ca-a5d1-352f9202ee0e',
                        name: 'Z',
                        type: 'float',
                        defaultValue: { tag: 'lit', type: 'float', val: 0 }
                    },
                    w: {
                        id: '636747b5-bd58-40d1-95cf-9a0907d66bab',
                        name: 'W',
                        type: 'float',
                        defaultValue: { tag: 'lit', type: 'float', val: 1 },
                        value: { tag: 'lit', type: 'float', val: 1 }
                    }
                },
                outputs: { vector4: { id: 'c0d436e2-2758-44f5-87d5-39f4b99fe663', name: 'Vector 4', type: 'vec4' } }
            }
        ],
        [
            '29c0266f-2134-4784-84c4-5a7e8bb736f5',
            {
                id: '29c0266f-2134-4784-84c4-5a7e8bb736f5',
                name: 'Swizzle',
                type: 'SWIZZLE',
                data: { position: { x: -487, y: 301 }, type: { selected: 'vec2', options: ['vec2', 'vec3', 'vec4'] } },
                inputs: {
                    vector: {
                        id: 'e4ea6634-e63f-4c98-a508-14dbd3f73fc8',
                        name: 'Vector',
                        type: 'vec2',
                        defaultValue: {
                            tag: 'lit',
                            type: 'vec2',
                            val: [
                                { tag: 'lit', type: 'float', val: 0 },
                                { tag: 'lit', type: 'float', val: 0 }
                            ]
                        }
                    }
                },
                outputs: {
                    x: { id: 'a382325c-52a8-452f-87f7-df7b137b0848', name: 'X', type: 'float' },
                    y: { id: 'dd96d8fd-3a11-40c8-a488-b7166eeed45e', name: 'Y', type: 'float' }
                }
            }
        ],
        [
            '8ba2eddf-1c8f-4cb2-ab41-abde5e0dcb03',
            {
                id: '8ba2eddf-1c8f-4cb2-ab41-abde5e0dcb03',
                name: 'Time',
                type: 'TIME',
                data: { position: { x: -856, y: -6 } },
                inputs: {},
                outputs: { time: { id: '511a3495-edee-4d1a-a4c8-9edb97f22023', name: 'Time', type: 'float' } }
            }
        ],
        [
            'd122a086-3e8c-4e08-ae7f-5d7e8cae7235',
            {
                id: 'd122a086-3e8c-4e08-ae7f-5d7e8cae7235',
                name: 'Sine',
                type: 'SINE',
                data: {
                    position: { x: -530, y: 43 },
                    type: { selected: 'float', options: ['float', 'vec2', 'vec3', 'vec4'] }
                },
                inputs: {
                    input: {
                        id: 'df23ecef-2fd9-4a58-baa4-61b893e3d3d7',
                        name: 'Input',
                        type: 'float',
                        defaultValue: { tag: 'lit', type: 'float', val: 0 }
                    }
                },
                outputs: { output: { id: '3c3bb6c1-136b-4ffd-8efa-bb4b706978cb', name: 'Output', type: 'float' } }
            }
        ]
    ],
    connections: [
        [
            '4b1d7a5b-55b6-4e8f-8452-57d5a948eb6c',
            {
                id: '4b1d7a5b-55b6-4e8f-8452-57d5a948eb6c',
                from: 'a382325c-52a8-452f-87f7-df7b137b0848',
                to: 'ce885d60-add2-4e1a-b214-774c4520e8b6'
            }
        ],
        [
            '7b58c75f-90f9-45d4-b1cd-a4d70324ea0f',
            {
                id: '7b58c75f-90f9-45d4-b1cd-a4d70324ea0f',
                from: 'dd96d8fd-3a11-40c8-a488-b7166eeed45e',
                to: 'e5c6a901-d9a1-4c42-8a77-f4c220f6db74'
            }
        ],
        [
            '5dd32fa7-af4f-4207-9e34-0b176cdbcb50',
            {
                id: '5dd32fa7-af4f-4207-9e34-0b176cdbcb50',
                from: '75478c57-926d-47ea-8713-d1ddeab4a4f2',
                to: 'e4ea6634-e63f-4c98-a508-14dbd3f73fc8'
            }
        ],
        [
            'b6ec7770-388e-44e4-af3b-589028c40368',
            {
                id: 'b6ec7770-388e-44e4-af3b-589028c40368',
                from: 'c0d436e2-2758-44f5-87d5-39f4b99fe663',
                to: '31de6cb7-6270-4354-aa20-7f304199d367'
            }
        ],
        [
            'e6003195-2ec5-4e29-a2ac-6643daf130e0',
            {
                id: 'e6003195-2ec5-4e29-a2ac-6643daf130e0',
                from: '511a3495-edee-4d1a-a4c8-9edb97f22023',
                to: 'df23ecef-2fd9-4a58-baa4-61b893e3d3d7'
            }
        ],
        [
            'ad3e9e7d-4244-457b-a7a7-52790f942228',
            {
                id: 'ad3e9e7d-4244-457b-a7a7-52790f942228',
                from: '3c3bb6c1-136b-4ffd-8efa-bb4b706978cb',
                to: '9d2e0fe6-7f9c-46ca-a5d1-352f9202ee0e'
            }
        ]
    ]
};
