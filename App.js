import React from "react";
import Sound from "react-native-sound";
import { LogBox } from "react-native";
import { Logs } from "expo";
import { View, AsyncStorage } from "react-native";
import Stylesheet from "./Stylesheet";
import { LinearGradient } from "expo-linear-gradient";
import FooterMenu from "./components/footerMenu";
import Loader from "./components/loader";
import Router from "./components/router";
import { Audio } from "expo-av";
import BackHandler from "./backButton";
import * as Permissions from "expo-permissions";
import * as rssParser from "react-native-rss-parser";
import * as Contacts from "expo-contacts";
import * as Font from "expo-font";

//LogBox.ignoreAllLogs();
Logs.enableExpoCliLogging();

// Enable playback in silence mode
//Sound.setCategory("Playback");

export default class App extends React.Component {
	state = {
		categories: {},
		rss: null,
		itemIndex: 0,
		loading: true,
		menu: 1,
		audio: null,
		category: "All Podcasts",
		contacts: null,
	};

	async fetchRSS() {
		let items = {};
		fetch("http://innermanradio.org/podcastfeed.rss")
			.then((response) => response.text())
			.then((responseData) => {
				const topics = responseData.match(/<item>[\s\S]*?<\/item>/g);
				topics.map((el) => {
					items[
						el
							.match(/<guid>[\s\S]*?<\/guid>/)[0]
							.replace("<guid>", "")
							.replace("</guid>", "")
					] = el.match(/<topics>[\s\S]*?<\/topics>/)
						? el.match(/<topics>[\s\S]*?<\/topics>/).map((el2) =>
								el2
									.match(/<topic>[\s\S]*?<\/topic>/)[0]
									.replace("<topic>", "")
									.replace("</topic>", "")
						  )
						: null;
				});
				return rssParser.parse(responseData);
			})
			.then(async (rss) => {
				const obj = {};
				rss.items.reverse().map((el, i) => {
					el.isNew = i < 1 ? true : false;
					el.topics = items[el.id];
					obj[el.id] = el;
				});
				rss.max = parseInt(rss.items[0].id);
				rss.min = parseInt(rss.items[rss.items.length - 1].id);
				rss.items = obj;
				const audio = await new Audio.Sound();
				const categories = await fetch(
					"https://innermanradio.org/topicapi"
				).then((res) => res.json());
				return {
					categories,
					rss,
					loading: false,
					itemIndex: rss.items.length - 1,
					audio,
				};
			})
			.then((res) => this.setState(res));
	}

	async moveIndex(i) {
		await this.state.audio.unloadAsync();
		let itemIndex = this.state.itemIndex + i;
		if (itemIndex < this.state.rss.min) {
			itemIndex = this.state.rss.max;
		} else if (itemIndex > this.state.rss.max) {
			itemIndex = this.state.rss.min;
		}
		for (
			let mod = i < 0 ? -1 : 1;
			!this.state.rss.items[itemIndex];
			i < 0 ? mod-- : mod++
		) {
			itemIndex += mod;
		}
		this.setState({
			itemIndex,
			loading: true,
		});
	}

	async sendSMS() {
		const { status, permissions } = await Permissions.askAsync(
			Permissions.CONTACTS
		);
		if (status === "granted") {
			const contacts = await Contacts.getContactsAsync();
			this.setState({ contacts });
		} else {
			throw new Error("Contacts permission not granted");
		}
	}

	setIndex(itemIndex) {
		this.setState({ itemIndex });
	}

	setMenu(menu, category) {
		this.setState({ loading: true, menu, category });
		this.state.audio.unloadAsync();
		if (this.state.menu === 1) {
			BackHandler.handleAndroidBackButton(() => BackHandler.exitApp());
		}
	}

	setLoading(loading) {
		this.setState({ loading });
	}

	componentWillUnmount() {
		BackHandler.removeAndroidBackButtonHandler();
	}

	doTest() {
		// Load the sound file 'whoosh.mp3' from the app bundle
		// See notes below about preloading sounds within initialization code below.
		// var whoosh = new Sound("whoosh.mp3", Sound.MAIN_BUNDLE, (error) => {
		// 	if (error) {
		// 		console.log("failed to load the sound", error);
		// 		return;
		// 	}
		// 	// loaded successfully
		// 	console.log(
		// 		"duration in seconds: " +
		// 			whoosh.getDuration() +
		// 			"number of channels: " +
		// 			whoosh.getNumberOfChannels()
		// 	);
		// 	// Play the sound with an onEnd callback
		// 	whoosh.play((success) => {
		// 		if (success) {
		// 			console.log("successfully finished playing");
		// 		} else {
		// 			console.log("playback failed due to audio decoding errors");
		// 		}
		// 	});
		// });
	}

	componentDidMount() {
		Font.loadAsync({
			acumin_variable_concept: require("./assets/AcuminVariableConcept.otf"),
		});
		Audio.setAudioModeAsync({
			staysActiveInBackground: true,
			playsInSilentModeIOS: true,
			allowsRecordingIOS: false,
			shouldDuckAndroid: true,
			interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
			interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
			playThroughEarpieceAndroid: false,
		});
		BackHandler.handleAndroidBackButton(() => BackHandler.exitApp());
		this.fetchRSS();
		//AsyncStorage.clear(() => console.log("Save data cleared."));
		//this.doTest();
	}

	async save(obj) {
		try {
			return await AsyncStorage.setItem(obj.key, obj.value);
		} catch (error) {
			console.log(error);
		}
	}

	async retrieve(key) {
		try {
			return await AsyncStorage.getItem(key);
		} catch (error) {
			console.log(error);
		}
	}

	async getAllKeys() {
		try {
			return await AsyncStorage.getAllKeys();
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		const gradient = Stylesheet.app.gradient;
		return (
			<View style={Stylesheet.app}>
				<LinearGradient
					style={Stylesheet.app.gradientStyle}
					colors={Stylesheet.app.gradientColors}
				>
					<View style={Stylesheet.body}>
						{this.state.rss ? (
							<Router
								categories={this.state.categories}
								contacts={this.state.contacts}
								category={this.state.category}
								audio={this.state.audio}
								setIndex={(i) => this.setIndex(i)}
								menu={this.state.menu}
								listingImg={require("./assets/imr_header.png")}
								coverImg={
									"http://innermanradio.org/content/podcastfeed.rss/inner-man-radio-cover.png"
								}
								setLoading={(loading) => this.setLoading(loading)}
								moveIndex={(i) => this.moveIndex(i)}
								item={
									this.state.rss
										? this.state.rss.items[this.state.itemIndex]
										: null
								}
								rss={this.state.rss}
								retrieve={(str) => this.retrieve(str)}
								getAllKeys={() => this.getAllKeys()}
								save={(obj) => this.save(obj)}
								setMenu={(i, j) => this.setMenu(i, j)}
							/>
						) : null}
					</View>
					<FooterMenu
						itemIndex={this.state.itemIndex}
						category={this.state.category}
						contacts={this.state.contacts}
						menu={this.state.menu}
						setMenu={(i, j) => this.setMenu(i, j)}
						sendSMS={() => this.sendSMS()}
					/>
				</LinearGradient>
				<Loader
					setLoading={(loading) => this.setLoading(loading)}
					loading={this.state.loading}
				/>
			</View>
		);
	}
}
