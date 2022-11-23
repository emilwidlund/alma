import * as React from 'react';

export type IModalProps = React.PropsWithChildren<{
    title: string;
    footer?: JSX.Element;
    onClose?(e: KeyboardEvent | React.MouseEvent): void;
}>;
