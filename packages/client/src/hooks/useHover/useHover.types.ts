export type HoverEventHandler<TElement> = (
    event: React.MouseEvent<TElement>
) => ((event: React.MouseEvent<TElement>) => void) | void;
