import React, { Component } from "react";
import Stylesheet from "../Stylesheet";
import { View, ScrollView, TouchableWithoutFeedback } from "react-native";
import * as Animatable from "react-native-animatable";
import {
  Icon,
  ListItem,
  Image,
  Divider,
  Text,
  Input
} from "react-native-elements";
import BackHandler from "../backButton";

class Bar extends React.Component {
  async handlePress() {
    await this.props.save({
      key: this.props.id,
      value: "true"
    });
    this.props.setIndex(parseInt(this.props.index));
    this.props.setMenu(0);
  }

  render() {
    return (
      <View>
        <ListItem
          onPress={() => this.handlePress()}
          style={Stylesheet.listing.bar}
          leftIcon={
            <Icon
              color={Stylesheet.listing.bar.icon.color}
              size={40}
              name="play-circle-outline"
            />
          }
          containerStyle={Stylesheet.listing.bar.containerStyle}
          title={this.props.title}
          titleStyle={Stylesheet.listing.bar.title}
          subtitleStyle={Stylesheet.listing.bar.subTitle}
          subtitle={this.props.subtitle}
        />
        {this.props.new ? (
          <Animatable.View
            iterationCount={"infinite"}
            direction={"reverse"}
            animation={"pulse"}
            style={Stylesheet.listing.new}
          >
            <Text style={Stylesheet.listing.new}>LATEST</Text>
          </Animatable.View>
        ) : null}
        {!this.props.unheard ? (
          <Animatable.View
            iterationCount={0}
            direction={"reverse"}
            animation={"pulse"}
            style={Stylesheet.listing.unheard}
          >
            <Icon
              color={Stylesheet.listing.unheard.color}
              size={14}
              name={"fiber-manual-record"}
            />
          </Animatable.View>
        ) : null}
      </View>
    );
  }
}

export default class Listing extends Component {
  state = { content: null, term: "" };

  async filter() {
    const size = 35;
    const delay = 100;
    const animation = "bounceInLeft";
    const keys = await this.props.getAllKeys();
    const items = await Promise.all(
      Object.values(this.props.rss.items)
        .filter(el => {
          const category =
            this.props.category === "All Podcasts"
              ? true
              : el.topics
              ? el.topics.includes(this.props.category)
              : false;
          return category ? el : null;
        })
        .reverse()
        .map(async (el, i) => {
          return !this.state.term.length > 0 ||
            (this.state.term.length > 0 &&
              (el.title.toLowerCase().includes(this.state.term.toLowerCase()) ||
                el.itunes.subtitle
                  .toLowerCase()
                  .includes(this.state.term.toLowerCase()))) ? (
            <Animatable.View key={i} delay={i * delay} animation={animation}>
              <Bar
                id={el.id}
                save={obj => this.props.save(obj)}
                new={el.isNew}
                unheard={keys.includes(el.id)}
                index={parseInt(el.id)}
                title={el.title}
                setIndex={m => this.props.setIndex(m)}
                setMenu={n => this.props.setMenu(n)}
                subtitle={el.itunes.subtitle}
              />
            </Animatable.View>
          ) : null;
        })
    );
    return items.filter(el => el);
  }

  async populate() {
    const items = await this.filter();
    this.setState({
      content: this.props.rss ? (
        <View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 25
            }}
          >
            <Image
              source={
                this.props.listingImg
                  ? this.props.listingImg
                  : { uri: this.props.coverImg }
              }
              style={Stylesheet.listing.img}
            />
            <Text
              style={Stylesheet.listing.title}
            >{`Topic: ${this.props.category}`}</Text>
          </View>
          <Divider style={Stylesheet.listing.divider} />
          <View style={Stylesheet.listing.search}>
            <Input
              onChange={e => {
                this.state.term = e.nativeEvent.text;
                this.populate();
              }}
              inputStyle={{
                fontSize: Stylesheet.listing.search.fontSize,
                color: Stylesheet.listing.search.color
              }}
              placeholder="Search Episodes By Keyword"
              leftIcon={
                <Icon
                  name="search"
                  size={Stylesheet.listing.search.icon.size}
                  color={Stylesheet.listing.search.icon.color}
                />
              }
            />
          </View>
          <ScrollView style={Stylesheet.listing}>{items}</ScrollView>
        </View>
      ) : null
    });
  }

  async componentDidMount() {
    await this.populate();
    this.props.setLoading(false);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.category !== this.props.category) {
      await this.populate();
      this.props.setLoading(false);
    }
  }

  componentWillMount() {
    BackHandler.exitApp();
  }

  componentWillUnmount() {
    BackHandler.removeAndroidBackButtonHandler();
  }

  render() {
    return this.state.content;
  }
}
