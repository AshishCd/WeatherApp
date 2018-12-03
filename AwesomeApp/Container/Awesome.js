import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
//import Icon from "react-native-vector-icons/Ionicons";

export default class AwesomeApp extends Component {
  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.header}>
        {/* <Icon name={'ios-sunny'}/> */}
          <Text style={Styles.temp}>24</Text>
        </View>
        <View style={Styles.body}>
          <Text style={Styles.title}>Awesome Weather App</Text>
          <Text style={Styles.subTitle}>Let's Make it Rain</Text>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#FFD017"
  },
  header: {
      flexDirection:"row",
    flex: 1,
    justifyContent:"space-around",
    //backgroundColor: "blue",   
    alignItems: "center"
  },
  body: {
    flex: 5,
    //backgroundColor: "red",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    margin:10
  },

  temp:{
      fontFamily:"HelveticaNeue-Bold",
      fontSize:45,
      color:"#ffffff"
  },

  title:{
    fontFamily:"HelveticaNeue-Bold",
    fontSize:70,
    color:"#ffffff",
    marginBottom:5
},

subTitle:{
    fontFamily:"HelveticaNeue-Bold",
    fontSize:16,
    color:"#ffffff"
},


});
