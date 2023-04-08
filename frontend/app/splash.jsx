import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native"

export default function Splash(){
    return(
        <View style={{flex: 1, alignItems: 'center', margin: 0}}>
        <LottieView 
        source={require("../assets/splashscreen/ezgif.com-gif-to-mp4-latest.mp4.lottie.json")}
        autoPlay
        loop={true}
        resizeMode="cover"
        />
        </View>
    )
}