module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': ['./src/js/components'],
          '@core': ['./src/core'],
          '@configs': ['./src/configs'],
          '@img': ['./src/img'],
          '@style': ['./src/js/style'],
          '@pages': ['./src/js/pages'],
          '@models': ['./src/js/models'],
          '@collections': ['./src/js/collections'],
          '@tailwind': ['./src/configs/tailwind'],
          '@helpers': ['./src/core/helpers'],
          '@node_modules': ['./node_modules'],
        },
      },
    ],
  ],
};
