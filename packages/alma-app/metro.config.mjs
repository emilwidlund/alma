// Learn more https://docs.expo.dev/guides/monorepos
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Find the project and workspace directories
const projectRoot = __dirname;
// This can be replaced with `find-yarn-workspace-root`
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot];

module.exports = {
    ...config,
    resolver: {
        sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs'],
        assetExts: ['glb', 'png', 'jpg', 'vert', 'frag', 'ttf', 'otf', 'gql'],
        nodeModulesPaths: [path.resolve(projectRoot, 'node_modules'), path.resolve(workspaceRoot, 'node_modules')],
        disableHierarchicalLookup: true
    }
};
