import React, { Component } from "react";
import Stylesheet from "../Stylesheet";
import { View, TouchableWithoutFeedback } from "react-native";
import { Icon, Text } from "react-native-elements";
import * as WebBrowser from "expo-web-browser";
import ContactsPicker from "./contacts_picker";
import * as SMS from "expo-sms";

export default class FooterMenu extends Component {
  state = {
    sharing: false
  };

  smsTemplate() {
    return `Hey! I was listening to Inner Man Radio episode #${this.props.itemIndex} and thought you'd might like it!\n\nGoogle Play: http://play.google.com/store/apps/details?id=com.innermanradio.innermanradio\n\nApple Store: itms-apps://itunes.com/apps/Broc Roberts/Inner Man Radio\n\nWebsite: http://innermanradio.org`;
  }

  async sendText() {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      SMS.sendSMSAsync([], this.smsTemplate());
    } else {
      console.log("no sms");
    }
  }

  render() {
    const size = 35;
    const icon_0 =
      this.props.menu !== 1 || this.props.category !== "All Podcasts" ? (
        <TouchableWithoutFeedback
          onPress={() => this.props.setMenu(1, "All Podcasts")}
        >
          <Icon
            color={Stylesheet.footerMenuIcon.color}
            size={size}
            name="home"
          />
        </TouchableWithoutFeedback>
      ) : null;
    const icon_1 =
      this.props.menu !== 2 ? (
        <TouchableWithoutFeedback onPress={() => this.props.setMenu(2)}>
          <Text style={Stylesheet.footerMenu.topics}>Topics</Text>
        </TouchableWithoutFeedback>
      ) : null;
    const icon_2 =
      this.props.menu === 0 ? (
        <TouchableWithoutFeedback
          onPress={async () => {
            await this.sendText();
          }}
        >
          <Icon
            color={Stylesheet.footerMenuIcon.color}
            size={size}
            name="share"
          />
        </TouchableWithoutFeedback>
      ) : null;
    const icon_3 =
      this.props.menu !== 0 ? (
        <TouchableWithoutFeedback
          onPress={() =>
            WebBrowser.openBrowserAsync(
              "https://www.facebook.com/innermanradio"
            )
          }
        >
          <Icon
            color={Stylesheet.footerMenuIcon.color}
            size={size}
            name="facebook-square"
            type="font-awesome"
          />
        </TouchableWithoutFeedback>
      ) : null;
    return (
      <View style={Stylesheet.footerMenu}>
        {icon_0}
        {icon_1}
        {icon_2}
        {this.props.menu === 0 ? (
          <ContactsPicker
            itemIndex={this.props.itemIndex}
            contacts={this.props.contacts}
            setSharing={sharing => this.setState({ sharing })}
            sharing={this.state.sharing}
          />
        ) : null}
        {icon_3}
      </View>
    );
  }
}
