import { IContextProps } from '../../../core/api/Context/Context.types';
import { RendererType } from '../Renderer/Renderer.types';

export interface ICircuitProps<TRendererType extends RendererType> extends IContextProps {
    rendererType: TRendererType;
}
