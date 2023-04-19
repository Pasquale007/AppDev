import * as React from "react";
import { View } from "react-native";
import LottieView  from "lottie-react-native";
import { SetStateAction } from "react";
import Lottie from "lottie-react-native";


export default function Splash({setIsLoading}){
  
React.useEffect(()=>{
  setTimeout(setIsLoading, 3000)
},[])

   return(
     //<View style={{flex: 1, alignItems: 'center', margin: 0}}>
   <LottieView 
   source={require("../../assets/splashscreen/Splashscreen-new.json")}
   autoPlay={true}
    loop={true}
  resizeMode="contain"
  />
 // </View>
 )
   }


/**
export default function Animation({setIsLoading}) {
    
  return (
  <Lottie source={require('../../assets/splashscreen/splashscreen.json')} autoPlay loop={false} />
    );
  }
**/