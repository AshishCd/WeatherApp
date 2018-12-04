import React, { Component } from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { fetchWeather } from "../utils/weatherApi";
import Highlighter from "react-native-highlight-words";

const IconNames = {
  Default:"md-time",
  Clear: "md-sunny",
  Rain: "md-rainy",
  ThunderStorm: "md-thunderstorm",
  Clouds: "md-cloudy",
  Snow: "md-snow",
  Drizzle: "md-umbrella",
  Fog: "md-cloudy-night"
};

const phrases = {
  Default:{
    title:"Fetching Recent Location",
    subTitle:"Be patient, you're ",
    highlight:"Location",
    color:"#636363",
    backgroud:"#9C9C9C"
  },
  Clear: {
    title: "Beauty of the Clear Sun",
    subTitle: "Rock that Shit!",
    highlight:"Clear",
    color:"#E32500",
    backgroud:"#FFD017"
  },
  Rain: {
    title: "Rain rain go away",
    subtitle: "Stay inside and code all day",
    highlight:"away",
    color:"#004A96",
    backgroud:"#2F343A"
  },
  ThunderStorm: {
    title: "Ohhh....It's ThunderStorm",
    subTitle: "Unplug those devices",
    highlight:"ThunderStorm",
    color:"#FBFF46",
    backgroud:"#020202"
  },
  Clouds: {
    title: "Cloud storage limit reached",
    subtitle: "Oh..Should i go Out??",
    highlight:"limit",
    color:"#0044FF",
    backgroud:"#939393"
  },
  Snow: {
    title: "Heart Starts Freezing",
    subtitle: "Old Monk in my Mind!",
    highlight:"Freezing",
    color:"#021D4C",
    backgroud:"#15A678"
  },
  Drizzle: {
    title: "Meh....Don't Ask",
    subtitle: "What did I just Say??",
    highlight:"Don't",
    color:"#B3F6E4",
    backgroud:"#1FBB68"
  },
  Fog: {
    title: "Hey...too Foggy, I can't see you",
    subtitle: "Where are you ??",
    highlight:"Foggy",
    color:"#0044FF",
    backgroud:"#939393"

  }
};
export default class AwesomeApp extends Component {
  componentWillMount() {
    this.state = {
      temp: 0,
      weather: "Default"
    };
  }

  componentDidMount() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      posData =>
        fetchWeather(posData.coords.latitude, posData.coords.longitude).then(
          res =>
            this.setState({
              temp: Math.round(res.temp),              
              weather: res.weather
            })
        ),
      error => alert(error),
      { timeout: 1000 }
    );
  }

  render() {
    return (
      <View style={[Styles.container,{backgroundColor:phrases[this.state.weather].backgroud}]}>
        <StatusBar hidden={true} />
        <View style={Styles.header}>
          {console.log(this.state.temp)}
          <Icon
            name={IconNames[this.state.weather]}
            size={80}
            color={"white"}
          />
          <Text style={Styles.temp}>{this.state.temp}°</Text>
        </View>
        <View style={Styles.body}>
          <Highlighter
            style={Styles.title}
            highlightStyle={{color:phrases[this.state.weather].color}}
            searchWords={[phrases[this.state.weather].highlight]}
            textToHighlight={phrases[this.state.weather].title}
          />
          <Text style={Styles.subTitle}>
            {phrases[this.state.weather].subTitle}
          </Text>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFD017"
  },
  header: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    //backgroundColor: "blue",
    alignItems: "center"
  },
  body: {
    flex: 5,
    //backgroundColor: "red",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    margin: 10
  },

  temp: {
    fontFamily: "HelveticaNeue-Bold",
    fontSize: 45,
    color: "#ffffff"
  },

  title: {
    fontFamily: "HelveticaNeue-Bold",
    fontSize: 70,
    color: "#ffffff",
    marginBottom: 5
  },

  subTitle: {
    fontFamily: "HelveticaNeue-Bold",
    fontSize: 16,
    color: "#ffffff"
  }
});
