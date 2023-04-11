import * as React from "react";
import { View } from "react-native";
import {LottieView } from "lottie-react-native";
import { SetStateAction } from "react";
import Lottie from "lottie-react-native";

interface SplashProps{
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}

/**export default function Splash({setIsLoading}:SplashProps):JSX.Element{
   return(
     <View style={{flex: 1, alignItems: 'center', margin: 0}}>
   <LottieView 
   source={require("../../assets/splashscreen/splashscreen.json")}
   autoPlay={true}
    loop={false}
  resizeMode="cover"
  onAnimationFinish={() => setIsLoading(false)}
  />
  </View>
 )
   }
**/


export default function Animation({setIsLoading}:SplashProps):JSX.Element {
    
  return (
  <Lottie source={require('../../assets/splashscreen/splashscreen.json')} autoPlay loop={false} />
    );
  }
