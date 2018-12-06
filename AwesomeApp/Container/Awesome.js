import React, { Component } from "react";
import { Text, View, StyleSheet, StatusBar, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { fetchWeather } from "../utils/weatherApi";
import Highlighter from "react-native-highlight-words";
import moment from "moment";

const IconNames = {
  Default: "md-time",
  Clear: "md-sunny",
  Rain: "md-rainy",
  ThunderStorm: "md-thunderstorm",
  Clouds: "md-cloudy",
  Snow: "md-snow",
  Drizzle: "md-umbrella",
  Atmosphere: "md-cloud"
};

const phrases = {
  Default: {
    title: "Fetching Recent Location",
    subTitle: "Be patient, Something good is about to happen ",
    highlight: "Location",
    color: "#636363",
    background: "#9C9C9C"
  },
  Clear: {
    title: "Beauty of the Clear Sun",
    subTitle: "Rock that Shit!",
    highlight: "Clear",
    color: "#E32500",
    background: "#FFD017"
  },
  Rain: {
    title: "Rain rain go away",
    subtitle: "Stay inside and code all day",
    highlight: "away",
    color: "#004A96",
    background: "#2F343A"
  },
  ThunderStorm: {
    title: "Ohhh....It's ThunderStorm",
    subTitle: "Unplug those devices",
    highlight: "ThunderStorm",
    color: "#FBFF46",
    background: "#020202"
  },
  Clouds: {
    title: "Cloud storage limit reached",
    subtitle: "Oh..Should i go Out??",
    highlight: "limit",
    color: "#0044FF",
    background: "#939393"
  },
  Snow: {
    title: "Heart Starts Freezing",
    subtitle: "Old Monk in my Mind!",
    highlight: "Freezing",
    color: "#021D4C",
    background: "#15A678"
  },
  Drizzle: {
    title: "Meh....Don't Ask",
    subtitle: "What did I just Say??",
    highlight: "Don't",
    color: "#B3F6E4",
    background: "#1FBB68"
  },

  Atmosphere: {
    title: "Too Much Smoke Here...",
    subtitle: "Time to leave this city",
    highlight: "Smoke",
    color: "#FFFF00",
    background: "#939393"
  }
};
export default class AwesomeApp extends Component {
  componentWillMount() {
    this.state = {
      temp: 0,
      weather: "Default",
      location: "Mumbai",
      visibility: "3200",
      icon: "",
      pressure:"",
      wind:"",
      sunrise:"",
      sunset:"",
      id:"300"
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
              weather: res.weather,
              location: res.location,
              visibility: res.visibility,
              icon: res.icon,
              pressure: res.pressure,
              wind: res.wind,
              sunrise: res.sunrise,
              sunset: res.sunset,
              id:res.id
            })
        ),
      error => alert(error),
      { timeout: 1000 }
    );
  }

  sunRiseFormatter = (time) => {
    let ssTime = time;
    let formatTime = new Date(ssTime * 1000);
    console.log(formatTime);
    return moment(formatTime).calendar();
  }

  formatUIFunc = (id) =>{
    if(id >= 200 && id <= 232) {
      return "Thunderstorm";
    }
    else if(id >= 300 && id <= 321) {
      return "Drizzle";
    }
    else if(id >= 500 && id <= 531) {
      return "Rain";
    }
    else if(id >= 600 && id <= 622) {
      return "Snow";
    }
    else if(id >= 701 && id <= 781) {
      return "Atmosphere";
    }
    else if(id = 800) {
      return "Clear";
    }
    else if(id >= 801 && id <= 804) {
      return "Clouds";
    }
    else {
      return "Default"
    }
  }

  render() {    
    const weatherType = this.formatUIFunc(this.state.id);   
    console.log(weatherType);
    const {pressure, wind, sunrise, sunset} = this.state;
    return (
      <View
        style={[
          Styles.container,
          { backgroundColor: phrases[weatherType].background }
        ]}
      >
        <StatusBar hidden={true} />
        <View style={Styles.header}>
          <Icon name={IconNames[weatherType]} size={80} color={"white"} />
          {/* <Image style={{width: 60, height: 60}} source={{uri:`http://openweathermap.org/img/w/${this.state.icon}.png`}} /> */}
          <View>
            <Text style={Styles.temp}>{this.state.temp}°</Text>
            <Text style={Styles.cityOther}>City: {this.state.location}</Text>
            <Text style={Styles.cityOther}>
              Visibility: {this.state.visibility}
            </Text>
          </View>
        </View>
        <View style={Styles.detailsWrap}>
          <View style={Styles.detailsView}>
            <View>
              <Text>Pressure</Text>
              <Text>{pressure}</Text>
            </View>
            <View>
              <Text>Wind</Text>
              <Text>{wind}</Text>
            </View>
          </View>

          <View style={Styles.detailsView}>
            <View>
              <Text>SunRise</Text>
              <Text>{this.sunRiseFormatter(sunrise)}</Text>
            </View>
            <View>
              <Text>SunSet</Text>
              <Text>{this.sunRiseFormatter(sunset)}</Text>
            </View>
          </View>
        </View>
        <View style={Styles.body}>
          <Highlighter
            style={Styles.title}
            highlightStyle={{ color: phrases[weatherType].color }}
            searchWords={[phrases[weatherType].highlight]}
            textToHighlight={phrases[weatherType].title}
          />
          <Text style={Styles.subTitle}>{phrases[weatherType].subtitle}</Text>
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
    flex: 2,
    justifyContent: "space-around",
    alignItems: "center"
  },
  body: {
    flex: 4,
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
  },
  cityOther: {
    fontFamily: "HelveticaNeue-Bold",
    color: "#ffffff",
    fontSize: 12
  },

  detailsView: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 10,
    borderRadius: 5,
    minHeight: 60,
    alignItems: "center",
    justifyContent: "space-around"
  },

  detailsWrap: {
    justifyContent: "center",
    padding: 10
  }
});
