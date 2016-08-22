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
  View
} from 'react-native';

import GridView from './GridView';

class RichImageBrowserExample extends Component {
  render() {
    return (
      <GridView
          style={styles.gridview}
          images={[
            'http://www.bz55.com/uploads1/allimg/120312/1_120312100435_8.jpg',
            'http://pic3.bbzhi.com/fengjingbizhi/gaoqingkuanpingfengguangsheyingps/show_fengjingta_281299_11.jpg',
            'http://pic17.nipic.com/20111024/7675119_084440853000_2.jpg',
            'http://imgsrc.baidu.com/forum/pic/item/a275666b3b092e466a60fbfe.jpg',
            'http://img2.3lian.com/2014/c7/12/d/77.jpg',
            'http://pic1.nipic.com/2008-12-18/20081218175254901_2.jpg',
            'http://a.hiphotos.baidu.com/zhidao/pic/item/09fa513d269759eea57ece50b2fb43166d22df7b.jpg',
            'http://www.feizl.com/upload2007/2011_05/110505164429412.jpg',
            'http://vipbook.sinaedge.com/bookcover/pics/124/cover_64285d83248c839d9a1e3cbf9a1c44ea.jpg',
          ]}>
        </GridView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('RichImageBrowserExample', () => RichImageBrowserExample);
