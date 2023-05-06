import { css, injectGlobal } from '@emotion/css';

injectGlobal`

    html { 
        height: 100%;
        font-family: 'Inter', sans-serif; 
        font-size: 12px;
        color: var(--text-neutral-color);
        font-feature-settings: "ss01" 1, "cv01" 1;
        color-scheme: dark;
    }

    @supports (font-variation-settings: normal) {
        html { font-family: 'Inter var', sans-serif; }
    }

    body {
        height: 100%;
        margin: 0;
        background-color: var(--dark-contrast-background);
        user-select: none;
        -webkit-user-select: none;

        h1 {
            font-size: var(--font-size-xl);
        }

        h2 {
            font-size: var(--font-size-lg);
        }

        h3 {
            font-size: var(--font-size-md);
        }

        h4 {
            font-size: var(--font-size-sm);
        }

        h5 {
            font-size: var(--font-size-xs);
        }

        p {
            font-size: var(--font-size-sm);
            line-height: 1.8em;
        }

        a {
            text-decoration: none;
            border-bottom: 1px solid var(--accent-color);
            color: var(--accent-color);
        }

        #root {
            height: 100%;
        }

        input {
            color: var(--text-light-color);
        }

        &.modal-open {
            overflow: hidden;
        }
    }
`;

injectGlobal`
    :root {
        // Font Sizes
        --font-size-hero: 5em;
        --font-size-xl: 4em;
        --font-size-lg: 3em;
        --font-size-md: 2em;
        --font-size-sm: 1.2em;
        --font-size-xs: 1em;
        --font-size-xxs: .8em;

        // Colors
        --dark-contrast-background: #12141c;
        --dark-background: #1c1e2a;
        --panel-background: #242736;
        --light-background: #fff;
        --neutral-background: #f4f4f4;
        --border-color: #34384e;
        --connection-color: #424763;
        --accent-color: #1e62ff;
        --accent-color-subtle: rgba(30, 98, 255, .8);
        --text-light-color: #fff;
        --text-neutral-color: #7b7e8c;
        --text-dark-color: #000;

        --system-red: #ff4444;
        --system-yellow: #ffdd00;
    }
`;

export const transitionGroupWrapperStyles = css`
    display: flex;
    flex-direction: column;
    height: 100%;
`;
