import React, { Component } from "react";
import Stylesheet from "../Stylesheet";
import { Header as ReactNativeElementsHeader } from "react-native-elements";

export default class Header extends Component {
  render() {
    return (
      <ReactNativeElementsHeader
        backgroundColor="#2a2a2a"
        placement="left"
        leftComponent={{
          text: "Inner Man Radio",
          style: { color: "#fff" }
        }}
        rightComponent={{
          icon: "home",
          color: "#fff",
          onPress: () => console.log("pressed")
        }}
      />
    );
  }
}
