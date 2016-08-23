/**
 * Source code: https://github.com/CoderGLM/react-native-image-browser
 *
 * @flow
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  TouchableHighlight,
} from 'react-native';
import Carousel from './Carousel';

export default class GridView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      selectedIndex: 0,
      origins: [],
    };
  }

  render() {
<<<<<<< HEAD
    let images = [];
    let imgBtns = this.props.images.map((url, index) => {
      let img = <Image source={{uri:url}} style={styles.image}/>;
      images.push(img);
      return (
=======
    let { images } = this.props,
        imageElems = [],
        elems = [];

    images.forEach((uri, index) => {
      imageElems.push(
        <Image source={{uri}} style={styles.image}/>
      );
    });

    imageElems.forEach((img, index) => {
      elems.push(
>>>>>>> 88592bfca24e75840d1f10566351792bc972eb1d
        <TouchableHighlight
          key={"touch_"+index}
          ref={"touch_ref_"+index}
          activeOpacity={1}
          onPress={this._itemClicked.bind(this, index)}>
          {img}
        </TouchableHighlight>
      );
    });

    return (
      <View style={styles.container}>
<<<<<<< HEAD
        {imgBtns}
=======
        {elems}
>>>>>>> 88592bfca24e75840d1f10566351792bc972eb1d
        <Carousel
          origins={this.state.origins}
          firstPage={this.state.selectedIndex}
          isOpen={this.state.isOpenModal}
<<<<<<< HEAD
          children={images}
=======
          children={imageElems}
>>>>>>> 88592bfca24e75840d1f10566351792bc972eb1d
          onClose={this._closeCarousel.bind(this)}/>
      </View>
    );
  }

  componentDidMount() {
    console.log('-------');
    this.setState({
      origins: [],
    });
    // 如果不使用setTimeout，异步回调得不到正确的值
<<<<<<< HEAD
    setTimeout(() => {
      // 计算每个item的origin（原始坐标大小），保存在origins里
=======
    requestAnimationFrame(() => {
      // 计算没个item的origin（原始坐标大小），保存在origins里
>>>>>>> 88592bfca24e75840d1f10566351792bc972eb1d
      for (var i = 0; i < this.props.images.length; i++) {
        this.refs["touch_ref_"+i].measure((fx, fy, width, height, px, py) => {
          this.state.origins.push({
            x: px,
            y: py,
            width,
            height,
          });
        });
      }
    });
  }

  /*
   *
   *  Private
   *
   */
  _itemClicked(index: number): void {
    StatusBar.setHidden(true, 'fade');
    this.setState({
      selectedIndex: index,
      isOpenModal: true,
    });
  }

  _closeCarousel(): void {
    this.setState({
      isOpenModal: false,
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
<<<<<<< HEAD
    resizeMode: 'stretch',
    margin: 5,
    width: 100,
    height: 100,
    backgroundColor: 'gray',
=======
    width: 100,
    height: 100,
    margin: 5,
>>>>>>> 88592bfca24e75840d1f10566351792bc972eb1d
  }
});
