import * as React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native"
import { SetStateAction } from "react";

interface SplashProps{
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}

export default function Splash({setIsLoading}:SplashProps):JSX.Element{
   return(
     <View style={{flex: 1, alignItems: 'center', margin: 0}}>
   <LottieView 
   source={require("../../assets/splashscreen/ezgif.com-gif-to-mp4-latest.mp4.lottie.json")}
   autoPlay
    loop={false}
  resizeMode="cover"
  onAnimationFinish={() => setIsLoading(false)}
  />
  </View>
 )
   }



//export default function Animation() {
    
  //  return (
    //  <Lottie source={require('../../assets/splashscreen/ezgif.com-gif-to-mp4-latest.mp4.lottie.json')} autoPlay loop={false} />
    //);
  //}
