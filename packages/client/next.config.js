/** @type {import('next').NextConfig} */
// eslint-disable-next-line import/no-anonymous-default-export
const config = {
    reactStrictMode: true,
    webpack: config => {
        config.experiments = config.experiments || {};
        config.experiments.topLevelAwait = true;
        return config;
    }
};

module.exports = config;
