declare module '*.png' {
    const value: string;
    export default value;
}

declare module '*.json' {
    const value: string;
    export default value;
}

declare module '*.gql' {
    import { DocumentNode } from 'graphql';
    const Schema: DocumentNode;

    export default Schema;
}

declare global {
    interface Document {
        mozCancelFullScreen?: () => Promise<void>;
        msExitFullscreen?: () => Promise<void>;
        webkitExitFullscreen?: () => Promise<void>;
        mozFullScreenElement?: Element;
        msFullscreenElement?: Element;
        webkitFullscreenElement?: Element;
    }

    interface HTMLElement {
        msRequestFullscreen?: () => Promise<void>;
        mozRequestFullScreen?: () => Promise<void>;
        webkitRequestFullscreen?: () => Promise<void>;
    }
}
