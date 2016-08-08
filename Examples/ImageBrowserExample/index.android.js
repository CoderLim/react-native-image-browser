/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   Dimensions,
   Image,
 } from 'react-native';
 import GridView from './GridView';

 const WINDOW_WIDTH = Dimensions.get('window').width;

 class ImageBrowserExample extends Component {
   constructor(props) {
     super(props);
   }

   render() {
     return (
       <View style={styles.container}>
         <GridView style={styles.gridview}>
           <Image source={{uri:'http://www.bz55.com/uploads1/allimg/120312/1_120312100435_8.jpg'}} style={styles.image}/>
           <Image source={{uri:'http://pic3.bbzhi.com/fengjingbizhi/gaoqingkuanpingfengguangsheyingps/show_fengjingta_281299_11.jpg'}} style={styles.image}/>
           <Image source={{uri:'http://pic17.nipic.com/20111024/7675119_084440853000_2.jpg'}} style={styles.image}/>
           <Image source={{uri:'http://imgsrc.baidu.com/forum/pic/item/a275666b3b092e466a60fbfe.jpg'}} style={styles.image}/>
           <Image source={{uri:'http://img2.3lian.com/2014/c7/12/d/77.jpg'}} style={styles.image}/>
           <Image source={{uri:'http://pic1.nipic.com/2008-12-18/20081218175254901_2.jpg'}} style={styles.image}/>
           <Image source={{uri:'http://a.hiphotos.baidu.com/zhidao/pic/item/09fa513d269759eea57ece50b2fb43166d22df7b.jpg'}} style={styles.image}/>
           <Image source={{uri:'http://www.feizl.com/upload2007/2011_05/110505164429412.jpg'}} style={styles.image}/>
           <Image source={{uri:'http://vipbook.sinaedge.com/bookcover/pics/124/cover_64285d83248c839d9a1e3cbf9a1c44ea.jpg'}} style={styles.image}/>
         </GridView>
       </View>
     );
   }
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#F5FCFF',
   },
   image: {
     resizeMode: 'stretch',
     margin: 5,
     width: 100,
     height: 100,
     backgroundColor: 'gray',
   },
   gridview: {
     width: WINDOW_WIDTH,
     height: 300,
   }
 });

 AppRegistry.registerComponent('ImageBrowserExample', () => ImageBrowserExample);
