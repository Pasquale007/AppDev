import * as React from "react";
import LottieView from "lottie-react-native";
import GIF from "../../assets/splashscreen/splashscreen.json";
import { View } from "react-native";

export default function Splash({ setIsLoading }) {

  React.useEffect(() => {
    setTimeout(setIsLoading, 3000)
  }, [])

  return (
    <View>

    </View>
  )
}