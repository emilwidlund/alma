export enum Route {
    GRAPHQL = '/graphql',

    /** Authentication */

    OAUTH = '/oauth',

    GOOGLE_OAUTH = '/oauth/google',
    GOOGLE_OAUTH_REDIRECT = '/oauth/google/redirect',

    GITHUB_OAUTH = '/oauth/github',
    GITHUB_OAUTH_REDIRECT = '/oauth/github/redirect',
    GOOGLE_OAUTH_ONE_TAP = '/oauth/google/one-tap',

    ADOBE_OAUTH = '/oauth/adobe',
    ADOBE_OAUTH_REDIRECT = '/oauth/adobe/redirect',

    FIGMA_OAUTH = '/oauth/figma',
    FIGMA_OAUTH_REDIRECT = '/oauth/figma/redirect'
}
