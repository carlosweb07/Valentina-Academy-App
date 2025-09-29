module.exports = ({ config }) => {
  return {
    ...config,
    expo: {
      ...config.expo,
      extra: {
        backendUrl: process.env.EXPO_PUBLIC_BACKEND_URL || "http://192.168.10.129:8082"
      },
      // Asegúrate de que icon/splash referencien archivos .png existentes
      icon: "./assets/logo.png",
      splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
      },
      android: {
        ...config.expo?.android,
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive_foreground.png",
          backgroundColor: "#ffffff"
        }
      }
    }
  };
};
