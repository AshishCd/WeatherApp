/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AwesomeApp from "./Container/Awesome";
import { Provider } from "react-redux";
import {store} from "./Container/Store/store";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component {
  render() {
    return (      
      <Provider store={store}>
        <AwesomeApp/>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
 
});
