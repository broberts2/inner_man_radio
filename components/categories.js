import React, { Component } from "react";
import { ScrollView, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from "react-native-animatable";
import Stylesheet from "../Stylesheet";
import { Card, Text, Button, Icon, Divider } from "react-native-elements";
import BackHandler from "../backButton";

export default class Categories extends Component {
  componentDidMount() {
    this.props.setLoading(false);
  }

  renderCards() {
    const animation = "bounceInLeft";
    const delay = 100;
    const categories = [
      {
        title: "Becoming Light -  Putting 1 John To Work",
        text: `So - how’s the whole “shining the light” thing going? Here’s some added wattage to help increase the lumens! Massive, ground breaking principles are laid to paper in John’s first letter. They are life changing. Be sure to read 1 John when engaging this series. It is a transformational letter!`
      },
      {
        title: "Lies We Allow Ourselves To Believe",
        text: `There are a number of nasty little lies that Christians tend to believe. Usually it’s because the lies sound so humble and righteous. But in the end they render a Christian powerless to accomlish God’s purpose here on earth. We expose these lies and their underlying assumptions, offering steps we can use to overcome them.`
      },
      {
        title: "Overcoming Sin",
        text: `Tired of losing as a Christian? Sure, it’s noble sounding. “I tried to overcome this sin, but the Devil just go to me.” Yay for losing!!! In this series we challenge the notion that we are destined to lose to sin. What’s more, we replacing losing with winning. Yep. If you are tired of losing, but making a good show of it, this series is for you. If you want to WIN, this series is for you. Each episode builds on the last to change our mindset and give practical tools to win. We think it’s REVOLUTIONARY. You be the judge. Ready? Let’s GO!`
      },
      {
        title: "Youth Immersion",
        text: `Kids getting baptized. How old is old enough? At what age does God hold children accountable for their sins? In this series we address those questions and more, talking candidly as parents with the same concerns, and what to do if one finds themselves (or their children) immersed as youth.`
      },
      {
        title: "Is That REALLY Worship?",
        text: `You go to church. You have an experience. It’s called worship… or IS IT? In this two part series we challenge common notions of meaningful worship. Ready to be challenged? Ready to worship in a more meaningful way than ever before? Let’s GO!`
      },
      {
        title: "Ads and Promos",
        text: `We like to have fun on Inner Man Radio! Here are some promos from “sponsors” as well as episode announcements. Enjoy!`
      },
      {
        title: "Boots On The Ground",
        text: `Candid and insightful interviews with the fellas who are making it happen! We can learn from these guys.`
      },
      {
        title: "Making Disciples",
        text: `For most Christians, this is a MONUMENTAL STRUGGLE. How do we introduce the gospel to our friends, neighbors, family and co-workers? How do we turn those conversations into something that will last in their lives? How. Do. We. We. Make. Disciples? This series tackles this subject in basic form, and challenges us to think about some things we may have never thought about before. Ready to win? Let’s GO!`
      },
      {
        title: "Slave or Free? What If I Sin?",
        text: `Am I a slave to sin? How do I deal with sin in my life? This series is a follow-up to Overcoming Sin, but can be useful on it’s own merit. We challenge the commonly held belief that we are slaves to sin. And, we look at what the scriptures say should be our next step if we DO sin. Ready to win? Let’s GO!`
      },
      {
        title: "Impromptu Conversations",
        text: `“Almost live!” Every once in a while we’ll take on a topic without ANY preparation. (And you thought ALL the Inner Man Episodes were that way!) Frank conversations about real life scenarios. Like raw veggies, only a lot more flavor. Ready? Let’s GO!`
      }
    ];
    return categories.map((el, i) => (
      <TouchableWithoutFeedback onPress={() => this.props.setMenu(1, el.title)}>
        <Animatable.View key={i} delay={i * delay} animation={animation}>
          <Card title={el.title} image={{ uri: this.props.coverImg }}>
            <Text style={{ marginBottom: 10 }}>{el.text}</Text>
          </Card>
        </Animatable.View>
      </TouchableWithoutFeedback>
    ));
  }

  componentWillMount() {
    BackHandler.handleAndroidBackButton(() => this.props.setMenu(1));
  }

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
