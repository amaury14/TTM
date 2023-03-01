module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['module:metro-react-native-babel-preset'],
        plugins: [
            [
                'module-resolver',
                {
                    alias: {
                        '@': './src',
                        assets: './assets'
                    }
                }
            ],
            'react-native-reanimated/plugin'
        ],
        env: {
            production: {
                plugins: ['react-native-paper/babel']
            }
        }
    };
};
