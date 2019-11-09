import React, { Component } from "react";
import Stylesheet from "../Stylesheet";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

export default class Loader extends React.Component {
  render() {
    const animation = "bounceIn";
    return this.props.loading === true ? (
      <View style={Stylesheet.loader}>
        <LinearGradient
          style={Stylesheet.app.gradientStyle}
          colors={Stylesheet.app.gradientColors}
        >
          <View style={Stylesheet.loader.icon}>
            <Animatable.View iterationCount={"infinite"} animation={animation}>
              <Icon
                size={120}
                color={Stylesheet.loader.color}
                type={"font-awesome"}
                name={"headphones"}
              />
            </Animatable.View>
          </View>
        </LinearGradient>
      </View>
    ) : (
      <View />
    );
  }
}
