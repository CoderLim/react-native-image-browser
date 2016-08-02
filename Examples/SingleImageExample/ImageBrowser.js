/**
 * @flow
 */

 /*
  * How to get location of any element, two method metioned in this post:
  * http://stackoverflow.com/questions/30096038/react-native-getting-the-position-of-an-element
  */

import React, { Component } from 'react';
import {
  ReactNative,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import ReactNativeComponentTree from 'react/lib/ReactNativeComponentTree';
import { UIManager } from 'NativeModules';

const { WinW: width, WinH: height } = Dimensions.get('window');

export default class ImageBrowser extends Component {
  constructor(props) {
   super(props);

   this.state = {
     showModal: false,
     top: new Animated.Value(0),
     left: new Animated.Value(0),
     width: new Animated.Value(0),
     height: new Animated.Value(0),
   };
 }

 componentDidMount() {
 }

 render() {
   let images = [];
   for (let i = 0; i < 9; i++) {
       images.push((<TouchableHighlight key={'img_' + i} onPress={this._onPress.bind(this)} style={styles.image}>
         <Text>{i}</Text>
       </TouchableHighlight>));
   }
   return (
     <View style={styles.container}>
       <Modal
         animationType='none'
         transparent={true}
         visible={this.state.showModal}
       >
         <Animated.View style={styles.modalContainer}>
           <Animated.TouchableHighlight
             onPress={() => {this.setState({showModal: false})}}
             style={[styles.image,
               {
                 position: 'absolute',
                 backgroundColor: 'white',
                 left: this.state.left,
                 top: this.state.top,
                 width: this.state.width,
                 height: this.state.height,
               }]}>
             <Text>123</Text>
           </Animated.TouchableHighlight>
         </Animated.View>
       </Modal>

       <View style={styles.imageList}>
         {images}
       </View>
     </View>
   );
 }

 _onPress(e) {
   this.setState({
     showModal: true,
   });

   let target = ReactNativeComponentTree.getInstanceFromNode(e.nativeEvent.target);
   console.log(this.state.top);
   target.measure((fx, fy, width, height, px, py) => {
     Animated.parallel(['top', 'left', 'width', 'height'].map(property => {
       return Animated.timing(this.state[property],{
         toValue: 100,
         duration: 1000,
         easing: Easing.linear,
       });
     })).start();
   });
 };
}

var styles = StyleSheet.create({
 container: {
   flex: 1,
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#F5FCFF',
 },
 imageList: {
   backgroundColor: 'green',
   flex: 1,
   margin: 20,
   flexDirection: 'row',
   flexWrap: 'wrap',
 },
 image: {
   margin: 5,
   width: 100,
   height: 100,
   borderWidth: 1,
 },
 modalContainer: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'rgba(0,0,0,0.9)',
 }
});
