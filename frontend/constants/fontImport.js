const fontImport = () => {

const [fontsLoaded] = useFonts({
    RubikBold: require("../assets/fonts/Rubik-Bold.ttf"),
    RubikSemiBold: require("../assets/fonts/Rubik-SemiBold.ttf"),
    RubikMedium: require("../assets/fonts/Rubik-Medium.ttf"),
    RubikRegular: require("../assets/fonts/Rubik-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

}