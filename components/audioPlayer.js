import React, { Component } from "react";
import Stylesheet from "../Stylesheet";
import { View, TouchableWithoutFeedback } from "react-native";
import { Icon, Image, Text, Slider } from "react-native-elements";
import BackHandler from "../backButton";
import { Audio } from "expo-av";

export default class AudioPlayer extends Component {
  state = {
    playingIcon: "play-circle-outline",
    slider: 0,
    currentTime: "0:00",
    maxTime: "0:00"
  };

  formatSeconds(obj) {
    let currentTime = obj.positionMillis / 1000;
    let seconds = Math.floor(currentTime % 60);
    currentTime = `${Math.floor(currentTime / 60)}:${
      seconds > 9 ? seconds : `0${seconds}`
    }`;
    let maxTime = obj.durationMillis / 1000;
    seconds = Math.floor(maxTime % 60);
    maxTime = `${Math.floor(maxTime / 60)}:${
      seconds > 9 ? seconds : `0${seconds}`
    }`;
    return {
      currentTime,
      maxTime
    };
  }

  updateSlider(obj) {
    if (obj.isLoaded) {
      const slider = obj.positionMillis / obj.durationMillis;
      const time = this.formatSeconds(obj);
      if (slider >= 1) {
        this.stopAudio();
      } else {
        this.setState({
          slider,
          currentTime: time.currentTime,
          maxTime: time.maxTime
        });
      }
    }
  }

  async loadAudio(audioPath) {
    const status = await this.props.audio.getStatusAsync();
    if (status.isPlaying) {
      await this.stopAudio();
    }
    this.setState({ playingIcon: "play-circle-outline", slider: 0 });
    await this.props.audio.loadAsync(audioPath);
    this.props.audio.setOnPlaybackStatusUpdate(obj => this.updateSlider(obj));
    this.props.setLoading(false);
  }

  async playAudio() {
    const status = await this.props.audio.playAsync();
    this.setState({
      playingIcon: "pause-circle-outline"
    });
    return status;
  }

  async pauseAudio() {
    const status = await this.props.audio.pauseAsync();
    this.setState({
      playingIcon: "play-circle-outline"
    });
    return status;
  }

  async stopAudio() {
    await this.props.audio.stopAsync();
    this.setState({
      playingIcon: "play-circle-outline",
      slider: 0
    });
  }

  async toggleAudio() {
    const status = await this.props.audio.getStatusAsync();
    if (status.isLoaded) {
      const status = await this.props.audio.getStatusAsync();
      return status.isPlaying ? this.pauseAudio() : this.playAudio();
    }
  }

  async setPosition(percentage) {
    await this.pauseAudio();
    const status = await this.props.audio.getStatusAsync();
    return await this.props.audio.setPositionAsync(
      status.durationMillis * percentage
    );
  }

  async componentDidUpdate(prevProps) {
    if (
      this.props.item.enclosures[0].url !== prevProps.item.enclosures[0].url
    ) {
      this.loadAudio({ uri: this.props.item.enclosures[0].url });
    }
  }

  componentWillReceiveProps() {
    this.props.save({
      key: this.props.item.id,
      value: "true"
    });
  }

  componentDidMount() {
    if (this.props.item) {
      this.loadAudio({ uri: this.props.item.enclosures[0].url });
    }
  }

  componentWillMount() {
    BackHandler.handleAndroidBackButton(() => this.props.setMenu(1));
  }

  componentWillUnmount() {
    BackHandler.removeAndroidBackButtonHandler();
  }

  render() {
    const size = 50;
    const sizeDown = 0.75;
    const playMultiplier = 1.5;
    const modSpeed = 3;
    return this.props.item ? (
      <View style={Stylesheet.audioPlayer}>
        <View style={Stylesheet.audioPlayer.displays}>
          <Image
            source={{ uri: this.props.coverImg }}
            style={Stylesheet.audioPlayer.displays.img}
          />
          <Text style={Stylesheet.audioPlayer.displays.title}>
            {this.props.item.title}
          </Text>
          <Text style={Stylesheet.audioPlayer.displays.subTitle}>
            {this.props.item.published.split(" 00:00:00")[0]}
          </Text>
        </View>
        <View style={Stylesheet.audioPlayer.audioControls}>
          <TouchableWithoutFeedback onPress={() => this.props.moveIndex(-1)}>
            <Icon
              color={Stylesheet.footerMenuIcon.color}
              size={size * sizeDown}
              name="skip-previous"
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onLongPress={() => this.setPosition(0)}>
            <Icon
              color={Stylesheet.footerMenuIcon.color}
              size={size}
              name="fast-rewind"
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.toggleAudio()}>
            <Icon
              color={Stylesheet.footerMenuIcon.color}
              size={size * playMultiplier}
              name={this.state.playingIcon}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onLongPress={() =>
              this.props.audio.setRateAsync(
                modSpeed,
                true,
                Audio.PitchCorrectionQuality.High
              )
            }
            onPressOut={() =>
              this.props.audio.setRateAsync(
                1,
                true,
                Audio.PitchCorrectionQuality.High
              )
            }
          >
            <Icon
              color={Stylesheet.footerMenuIcon.color}
              size={size}
              name="fast-forward"
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.props.moveIndex(1)}>
            <Icon
              color={Stylesheet.footerMenuIcon.color}
              size={size * sizeDown}
              name="skip-next"
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={Stylesheet.audioPlayer.audioControls.slider}>
          <Slider
            minimumTrackTintColor={
              Stylesheet.audioPlayer.audioControls.slider.track.minColor
            }
            maximumTrackTintColor={
              Stylesheet.audioPlayer.audioControls.slider.track.maxColor
            }
            thumbStyle={Stylesheet.audioPlayer.audioControls.slider.thumb}
            value={this.state.slider}
            onValueChange={e => this.setPosition(e)}
          />
          <Text
            style={Stylesheet.audioPlayer.audioControls.timer}
          >{`${this.state.currentTime} / ${this.state.maxTime}`}</Text>
        </View>
      </View>
    ) : (
      <View />
    );
  }
}
