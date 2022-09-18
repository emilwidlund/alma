import { ShaderContext } from './models/core/ShaderContext/ShaderContext';
import { FloatNode } from './models/nodes/FloatNode/FloatNode';
import { Vector3Node } from './models/nodes/Vector3Node/Vector3Node';

const float = new FloatNode(10);
const vec = new Vector3Node(10, 20, 30);
const ctx = new ShaderContext(vec);
