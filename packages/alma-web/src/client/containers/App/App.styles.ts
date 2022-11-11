import { css, injectGlobal } from '@emotion/css';

injectGlobal`
    @import url('https://rsms.me/inter/inter.css');
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');

    html { 
        height: 100%;
        font-family: 'Inter', sans-serif; 
        font-size: 22px;
        color: var(--text-neutral-color);
        line-height: 1.8rem;
        font-feature-settings: "ss01" 1, "ss02" 1, "cv01" 1;
    }

    @supports (font-variation-settings: normal) {
        html, button { font-family: 'Inter var', sans-serif; }
    }

    body {
        height: 100%;
        margin: 0;

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

        p {
            font-size: var(--font-size-sm);
        }

        #root {
            height: 100%;
        }
    }
`;

injectGlobal`
    :root {
        // Font Sizes
        --font-size-hero: 5em;
        --font-size-xl: 4em;
        --font-size-lg: 2.5em;
        --font-size-md: 2em;
        --font-size-sm: 1em;
        --font-size-xs: .8em;

        // Colors
        --dark-background: #252628;
        --panel-background: #2a2b2d;
        --light-background: #fff;
        --neutral-background: #f4f4f4;
        --border-color: #565557;
        --accent-color: #1e62ff;
        --text-light-color: #fff;
        --text-neutral-color: #888;
        --text-dark-color: #000;

        --system-red: #ff4444;
        --system-yellow: #ffdd00;
    }
`;

export const transitionGroupWrapper = css`
    display: flex;
    flex-direction: column;
    height: 100%;
`;
