import * as React from "react";
import LottieView from "lottie-react-native";
import GIF from "../../assets/splashscreen/splashscreen.json";

export default function Splash({ setIsLoading }) {

  React.useEffect(() => {
    setTimeout(setIsLoading, 3000)
  }, [])

  return (
    <LottieView
      source={GIF}
      autoPlay={true}
      loop={true}
      resizeMode="cover"
    />
  )
}