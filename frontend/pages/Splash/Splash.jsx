import * as React from "react";
import { View } from "react-native";

export default function Splash({ setIsLoading }) {

  React.useEffect(() => {
    setTimeout(setIsLoading, 3000)
  }, [])

  return (
    <View></View>
  )
}