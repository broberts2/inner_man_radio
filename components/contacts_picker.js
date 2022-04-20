import React, { Component } from "react";
import Stylesheet from "../Stylesheet";
import { View, ScrollView, TouchableWithoutFeedback } from "react-native";
import {
	Icon,
	Overlay,
	Text,
	Card,
	Image,
	ListItem,
} from "react-native-elements";
import * as SMS from "expo-sms";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

export default class ContactsPicker extends React.Component {
	smsTemplate() {
		return `Hey! I was listening to Inner Man Radio episode #${this.props.itemIndex} and thought you'd might like it!\n\nGoogle Play: https://exp.host/@broberts2/inner_man_radio\n\nApple Store: https://exp.host/@broberts2/inner_man_radio\n\nWebsite: http://innermanradio.org`;
	}

	async sendText(numArray) {
		this.props.setSharing(false);
		const isAvailable = await SMS.isAvailableAsync();
		if (isAvailable) {
			SMS.sendSMSAsync(numArray, this.smsTemplate());
		} else {
			console.log("no sms");
		}
	}

	render() {
		const size = 34;
		const delay = 50;
		const animation = "bounceInLeft";
		const contacts = this.props.contacts
			? this.props.contacts.data
					.map((el, i) =>
						el.imageAvailable ? (
							<Animatable.View key={i} delay={i * delay} animation={animation}>
								<ListItem
									onPress={() => this.sendText(el.phoneNumbers[0].number)}
									style={{ margin: 5 }}
									containerStyle={Stylesheet.contacts_picker.listItem}
									key={i}
									leftAvatar={{ source: { uri: el.image.uri } }}
									title={el.name}
									titleStyle={Stylesheet.contacts_picker.titleStyle}
									subtitle={el.phoneNumbers[0].number}
									subtitleStyle={Stylesheet.contacts_picker.subtitleStyle}
								/>
							</Animatable.View>
						) : null
					)
					.filter((el) => el)
					.sort((a, b) => a.name - b.name)
			: null;
		return (
			<Overlay
				style={Stylesheet.contacts_picker}
				isVisible={this.props.sharing}
				overlayBackgroundColor={Stylesheet.contacts_picker.backgroundColor}
			>
				<View style={Stylesheet.contacts_picker.backround}>
					<Text style={Stylesheet.contacts_picker.title}>
						Like the podcast? Share it!
					</Text>
					<ScrollView style={Stylesheet.contacts_picker.scrollView}>
						{contacts}
					</ScrollView>
					<View style={Stylesheet.contacts_picker.back}>
						<TouchableWithoutFeedback
							onPress={() => this.props.setSharing(false)}
						>
							<Icon
								color={Stylesheet.contacts_picker.back.color}
								size={size}
								name="arrow-back"
							/>
						</TouchableWithoutFeedback>
					</View>
				</View>
			</Overlay>
		);
	}
}
