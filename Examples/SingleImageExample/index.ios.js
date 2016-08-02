/**
 * @flow
 */

 /*
  * How to get location of any element, two method metioned in this post:
  * http://stackoverflow.com/questions/30096038/react-native-getting-the-position-of-an-element
  */

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Animated,
} from 'react-native';
import ImageBrowser from './ImageBrowser';

class SingleImageExample extends Component {
  constructor(props) {
   super(props);
 }

 render() {
   return (
     <View style={styles.container}>
      <ImageBrowser />
     </View>
   );
 }
}


var styles = StyleSheet.create({
 container: {
   flex: 1,
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#F5FCFF',
 },
});

AppRegistry.registerComponent('SingleImageExample', () => SingleImageExample);
