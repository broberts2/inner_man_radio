import React, { Component } from "react";
import { ScrollView, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from "react-native-animatable";
import Stylesheet from "../Stylesheet";
import { Card, Text, Button, Icon, Divider } from "react-native-elements";
import BackHandler from "../backButton";

export default class Categories extends Component {
	componentDidMount() {
		BackHandler.handleAndroidBackButton(() => this.props.setMenu(1));
		this.props.setLoading(false);
	}

	renderCards() {
		const animation = "bounceInLeft";
		const delay = 100;
		return Object.keys(this.props.categories).map((key, i) => (
			<TouchableWithoutFeedback onPress={() => this.props.setMenu(1, key)}>
				<Animatable.View key={i} delay={i * delay} animation={animation}>
					<Card title={key} image={{ uri: this.props.coverImg }}>
						<Text style={{ marginBottom: 10 }}>
							{this.props.categories[key].description}
						</Text>
					</Card>
				</Animatable.View>
			</TouchableWithoutFeedback>
		));
	}

	// componentWillMount() {
	// 	BackHandler.handleAndroidBackButton(() => this.props.setMenu(1));
	// }

	componentWillUnmount() {
		BackHandler.removeAndroidBackButtonHandler();
	}

	render() {
		return (
			<View style={Stylesheet.categories}>
				<Text style={Stylesheet.categories.text}>Pick a podcast by topic!</Text>
				<Divider style={Stylesheet.categories.divider} />
				<ScrollView style={Stylesheet.categories.scrollView}>
					{this.renderCards()}
				</ScrollView>
			</View>
		);
	}
}
