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
import Lightbox from './Lightbox/Lightbox';

class SingleImageExample extends Component {
  constructor(props) {
   super(props);
 }

 render() {
   return (
     <View style={styles.container}>
      <Lightbox>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{ uri: 'http://img3.imgtn.bdimg.com/it/u=4126438489,771091236&fm=206&gp=0.jpg' }}>
        </Image>
      </Lightbox>
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
   backgroundColor: 'green',
 },
 image: {
   flex: 1,
   width: 200,
   height: 200,
   backgroundColor: 'white',
 },
});

AppRegistry.registerComponent('SingleImageExample', () => SingleImageExample);
