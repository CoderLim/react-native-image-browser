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
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal,
  Dimensions,
  LayoutAnimation,
} from 'react-native';
import ReactNativeComponentTree from 'react/lib/ReactNativeComponentTree';
import { UIManager } from 'NativeModules';

const {WinW: width, WinH: height} = Dimensions.get('window');
class SingleImageExample extends Component {
  constructor(props) {
   super(props);

   this.state = {
     showModal: false,
     positionStyle: {},

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
         <View style={styles.modalContainer}>
           <TouchableHighlight
             onPress={() => {this.setState({showModal: false})}}
             style={[styles.image,
               this.state.positionStyle,
               {
                 backgroundColor: 'white',
               }]}>
             <Text>123</Text>
           </TouchableHighlight>
         </View>
       </Modal>

       <View style={styles.imagebrowser}>
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
   target.measure( (fx, fy, width, height, px, py) => {
     this.setState({
         positionStyle: {
         position: 'absolute',
         left: px,
         top: py,
         width,
         height,
       }
     });
     LayoutAnimation.configureNext({
       duration: 700,
       create: {
         type: 'linear',
         property: 'scaleXY1',
       },
       update: {
         type: 'spring',
         springDamping: 0.4,
       }
     });
     this.setState({
         positionStyle: {
         position: 'absolute',
         left: px,
         top: py,
         width: width+200,
         height: height+200,
       }
     });
   });

   // UIManager.measureLayoutRelativeToParent(
   //   e.nativeEvent.target,
   //   (e) => {console.error(e)},
   //   (x, y, w, h) => {
   //     console.log('offset', x, y, w, h);
   //   });
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
 imagebrowser: {
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

AppRegistry.registerComponent('SingleImageExample', () => SingleImageExample);
