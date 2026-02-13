export default {
  expo: {
    name: 'Norgestiss',
    slug: 'Norgestiss',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'norgestiss',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true, // Enable new architecture for reanimated compatibility
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          'This app uses location to show nearby toilets and your current position on the map.',
      },
    },
    android: {
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './assets/images/icon.png',
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      permissions: ['ACCESS_FINE_LOCATION', 'ACCESS_COARSE_LOCATION'],
      package: 'com.esuegyda.Norgestiss',
      // Remove Google Maps config - use default provider
    },
    web: {
      output: 'static',
      favicon: './assets/images/icon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
          dark: {
            backgroundColor: '#000000',
          },
        },
      ],
      'expo-location',
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: '1231816f-1cf2-4819-b5a1-7d898c0e430d',
      },
    },
  },
};
