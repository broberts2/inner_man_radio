import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const pallete = 1;

const colors = [
  {
    fonts_and_icons: "#ffffff",
    gradient_0: ["#0F0F0F", "#090909"],
    thumb: "#F68B1F",
    bar_background: "#ffffff",
    bar_font: "#0F0F0F",
    latest: "#F68B1F",
    unheard: "rgb(231, 0, 84)"
  },
  {
    fonts_and_icons: "#0F0F0F",
    gradient_0: ["#ffffff", "#e2e2e2"],
    thumb: "#F68B1F",
    bar_background: "#0F0F0F",
    bar_font: "#ffffff",
    latest: "#F68B1F",
    unheard: "#F68B1F"
  }
];

module.exports = {
  app: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gradientColors: colors[pallete].gradient_0,
    gradientStyle: {
      padding: 20,
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height
    }
  },
  contacts_picker: {
    backgroundColor: colors[pallete].bar_background,
    scrollView: {
      height: "90%"
    },
    title: {
      fontFamily: "acumin_variable_concept",
      color: colors[pallete].gradient_0[0],
      fontSize: 14,
      fontWeight: "bold",
      marginTop: 10,
      marginBottom: 10
    },
    back: {
      position: "absolute",
      top: 0,
      right: 0,
      color: colors[pallete].gradient_0[0]
    },
    listItem: {
      borderRadius: 5,
      backgroundColor: colors[pallete].gradient_0[0]
    },
    titleStyle: {
      fontFamily: "acumin_variable_concept",
      color: colors[pallete].fonts_and_icons
    },
    subtitleStyle: {
      fontFamily: "acumin_variable_concept",
      color: colors[pallete].fonts_and_icons
    }
  },
  categories: {
    text: {
      fontFamily: "acumin_variable_concept",
      color: colors[pallete].fonts_and_icons,
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 25
    },
    divider: {
      backgroundColor: colors[pallete].fonts_and_icons,
      height: 2,
      margin: 6
    },
    scrollView: {}
  },
  audioPlayer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    displays: {
      flex: 2,
      justifyContent: "flex-start",
      marginTop: 25,
      img: {
        width: Dimensions.get("window").width * 0.9,
        height: Dimensions.get("window").height * 0.4
      },
      title: {
        fontFamily: "acumin_variable_concept",
        marginTop: 25,
        marginBottom: 10,
        color: colors[pallete].fonts_and_icons,
        fontSize: 24,
        fontWeight: "bold"
      },
      subTitle: {
        fontFamily: "acumin_variable_concept",
        marginTop: 10,
        marginBottom: 25,
        color: colors[pallete].fonts_and_icons,
        fontSize: 14
      }
    },
    audioControls: {
      alignSelf: "stretch",
      alignItems: "center",
      justifyContent: "space-around",
      flexDirection: "row",
      slider: {
        backgroundColor: "transparent",
        width: Dimensions.get("window").width * 0.9,
        thumb: {
          backgroundColor: colors[pallete].thumb,
          borderWidth: 2,
          borderColor: colors[pallete].thumb
        },
        track: {
          backgroundColor: "yellow",
          minColor: colors[pallete].thumb,
          maxColor: colors[pallete].gray_light
        }
      },
      timer: {
        marginTop: 0,
        marginBottom: 0,
        color: colors[pallete].fonts_and_icons,
        fontSize: 14,
        fontFamily: "acumin_variable_concept"
      }
    }
  },
  body: {
    flex: 12,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center"
  },
  footerMenu: {
    flex: 1,
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    topics: {
      fontSize: 22,
      fontWeight: "bold"
    }
  },
  footerMenuIcon: {
    color: colors[pallete].fonts_and_icons
  },
  listing: {
    width: Dimensions.get("window").width * 0.9,
    img: {
      marginTop: 25,
      width: Dimensions.get("window").width * 0.9,
      height: Dimensions.get("window").width * 0.55
    },
    title: {
      fontFamily: "acumin_variable_concept",
      fontSize: 24,
      color: colors[pallete].fonts_and_icons,
      fontWeight: "bold"
    },
    search: {
      fontFamily: "acumin_variable_concept",
      width: Dimensions.get("window").width * 0.9,
      icon: {
        color: colors[pallete].fonts_and_icons,
        size: 28
      },
      fontSize: 18,
      color: colors[pallete].fonts_and_icons
    },
    divider: {
      backgroundColor: colors[pallete].fonts_and_icons,
      height: 2,
      margin: 6
    },
    unheard: {
      fontFamily: "acumin_variable_concept",
      color: colors[pallete].unheard,
      position: "absolute",
      fontWeight: "bold",
      top: 5,
      left: 5
    },
    new: {
      fontFamily: "acumin_variable_concept",
      fontSize: 12,
      transform: [{ rotate: "-5deg" }],
      color: colors[pallete].latest,
      position: "absolute",
      fontWeight: "800",
      bottom: 5,
      left: 7.5
    },
    bar: {
      icon: {
        color: colors[pallete].bar_font
      },
      marginTop: 3,
      marginBottom: 3,
      containerStyle: {
        borderRadius: 5,
        backgroundColor: colors[pallete].bar_background
      },
      title: {
        fontFamily: "acumin_variable_concept",
        color: colors[pallete].bar_font,
        fontWeight: "bold"
      },
      subTitle: {
        fontFamily: "acumin_variable_concept",
        color: colors[pallete].bar_font
      }
    }
  },
  loader: {
    color: colors[pallete].fonts_and_icons,
    position: "absolute",
    icon: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    }
  }
};
